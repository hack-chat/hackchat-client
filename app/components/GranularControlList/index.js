/**
 * GranularControlList exports
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import Modal from 'components/Modal';
import messages from './messages';

import Container from './Container';
import Table from './Table';
import ClickableTd from './ClickableTd';
import ControlsWrapper from './ControlsWrapper';
import FormGroup from './FormGroup';
import StyledTextInput from './StyledTextInput';
import StyledTextArea from './StyledTextArea';
import StyledSelect from './StyledSelect';
import ActionBtn from './ActionBtn';

const GranularControlList = ({ options, defaults, onChangeFunc, dir }) => {
  const intl = useIntl();
  const [list, setList] = useState(defaults || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const stateKey = options.keys[1];
  const selectStateText = intl.formatMessage(messages.selectStatePlaceholder);

  const handleCycleState = (idx) => {
    const row = list[idx];
    const currentState = row[stateKey];
    const stateIdx = options.states.indexOf(currentState);
    const nextState = options.states[(stateIdx + 1) % options.states.length];

    const newList = [...list];
    newList[idx] = { ...row, [stateKey]: nextState };
    setList(newList);
    onChangeFunc(newList);
  };

  const handleFieldChange = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleAddRow = () => {
    const newList = [...list, formData];
    setList(newList);
    onChangeFunc(newList);
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <Container dir={dir}>
      <Table>
        <tbody>
          {list.map((row, idx) => (
            <tr key={idx}>
              <td>{row[options.keys[0]]}</td>
              <ClickableTd onClick={() => handleCycleState(idx)}>
                {row[stateKey]}
              </ClickableTd>
            </tr>
          ))}
        </tbody>
      </Table>

      <ControlsWrapper>
        <ActionBtn onClick={() => setIsModalOpen(true)}>
          <FormattedMessage {...messages.addRowBtn} />
        </ActionBtn>
      </ControlsWrapper>

      <Modal isOpen={isModalOpen} doToggle={setIsModalOpen} zIndex={21}>
        <div dir={dir}>
          {options.fields.map((field) => (
            <FormGroup key={field.name}>
              {field.type === 'textarea' ? (
                <StyledTextArea
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                />
              ) : (
                <StyledTextInput
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                />
              )}
            </FormGroup>
          ))}

          <FormGroup>
            <StyledSelect
              value={formData[stateKey] || ''}
              onChange={(e) => handleFieldChange(stateKey, e.target.value)}
            >
              <option value="" disabled>
                {selectStateText}
              </option>
              {options.states.map((stateVal) => (
                <option key={stateVal} value={stateVal}>
                  {stateVal}
                </option>
              ))}
            </StyledSelect>
          </FormGroup>

          <ActionBtn onClick={handleAddRow}>
            <FormattedMessage {...messages.saveRowBtn} />
          </ActionBtn>
        </div>
      </Modal>
    </Container>
  );
};

GranularControlList.propTypes = {
  options: PropTypes.object.isRequired,
  defaults: PropTypes.array.isRequired,
  onChangeFunc: PropTypes.func.isRequired,
  dir: PropTypes.string,
};

export default GranularControlList;
