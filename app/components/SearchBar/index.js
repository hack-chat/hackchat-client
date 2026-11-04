/**
 * SearchBar exports
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import {
  IoChevronDown,
  IoClose,
  IoChevronUp,
  IoChevronDownOutline,
} from 'react-icons/io5';
import { GrSearchAdvanced } from 'react-icons/gr';

import NickPlaceholder from 'components/Message/NickPlaceholder';

import messages from './messages';

import Wrapper from './Wrapper';
import TopRow from './TopRow';
import ExpandRow from './ExpandRow';
import IconButton from './IconButton';
import SearchInput from './SearchInput';
import ResultCount from './ResultCount';
import AdvancedButton from './AdvancedButton';
import CheckboxLabel from './CheckboxLabel';
import Content from './Content';
import CheckBox from './CheckBox';

export default function SearchBar({
  onClose,
  searchValue,
  onSearchChange,
  mentionsOnly,
  onMentionsOnlyChange,
  matchCount,
  onNextMatch,
  onPrevMatch,
  resultText,
}) {
  const intl = useIntl();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    const handleFocusEvent = () => {
      if (inputRef.current) inputRef.current.focus();
    };

    window.addEventListener('app:focus-simple-search', handleFocusEvent);

    return () =>
      window.removeEventListener('app:focus-simple-search', handleFocusEvent);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter') {
      if (e.shiftKey) {
        onPrevMatch();
      } else {
        onNextMatch();
      }
    }
  };

  return (
    <Wrapper onKeyDown={handleKeyDown}>
      <NickPlaceholder />
      <Content>
        <TopRow>
          <IconButton
            onClick={() => setIsExpanded(!isExpanded)}
            $isRotated={isExpanded}
          >
            <IoChevronDown />
          </IconButton>

          <SearchInput
            ref={inputRef}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={intl.formatMessage(messages.searchChat)}
          />

          <ResultCount>{resultText}</ResultCount>

          <IconButton
            onClick={(e) => {
              e.preventDefault();
              onPrevMatch();
            }}
            disabled={matchCount === 0}
          >
            <IoChevronUp />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.preventDefault();
              onNextMatch();
            }}
            disabled={matchCount === 0}
          >
            <IoChevronDownOutline />
          </IconButton>

          <IconButton onClick={onClose}>
            <IoClose />
          </IconButton>
        </TopRow>

        <ExpandRow $isOpen={isExpanded}>
          <AdvancedButton onClick={() => navigate('/search')}>
            <GrSearchAdvanced /> {intl.formatMessage(messages.advancedSearch)}
          </AdvancedButton>

          <CheckboxLabel>
            <input
              type="checkbox"
              checked={mentionsOnly}
              onChange={(e) => onMentionsOnlyChange(e.target.checked)}
            />
            <CheckBox $isChecked={mentionsOnly} />
            {intl.formatMessage(messages.findMentions)}
          </CheckboxLabel>
        </ExpandRow>
      </Content>
    </Wrapper>
  );
}

SearchBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  mentionsOnly: PropTypes.bool.isRequired,
  onMentionsOnlyChange: PropTypes.func.isRequired,
  matchCount: PropTypes.number.isRequired,
  onNextMatch: PropTypes.func.isRequired,
  onPrevMatch: PropTypes.func.isRequired,
  resultText: PropTypes.string.isRequired,
};
