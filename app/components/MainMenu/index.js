/**
 * MainMenu exports the ui rendering functions to display the main menu button
 * and child elements
 */

import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';

import JoinModal from 'components/JoinModal';
import LocaleModal from 'components/LocaleModal';
import ChannelsModal from 'components/ChannelsModal';
import UsersModal from 'components/UsersModal';

import { Container, Row, Col } from 'reactstrap';
import MenuButton from 'components/MenuButton';
import {
  MdMenu,
  MdClose,
  MdSettings,
  MdLanguage,
  MdForum,
  MdPeople,
} from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import Spacer from './Spacer';
import Collapse from './Collapse';
import messages from './messages';
import {
  openMainMenu,
  closeMainMenu,
  openUsersModal,
  closeUsersModal,
  openChannelsModal,
  closeChannelsModal,
  openJoinModal,
  closeJoinModal,
  openLocaleModal,
  closeLocaleModal,
} from './actions';
import reducer from './reducer';
import {
  makeSelectMainMenuStatus,
  makeSelectUsersMenuStatus,
  makeSelectChannelsModalStatus,
  makeSelectJoinMenuStatus,
  makeSelectLocaleMenuStatus,
} from './selectors';

export function MainMenu({
  mainMenuIsOpen,
  usersMenuIsOpen,
  ChannelsModalIsOpen,
  joinMenuIsOpen,
  localeMenuIsOpen,
  onOpenMainMenu,
  onCloseMainMenu,
  onOpenUsersModal,
  onCloseUsersModal,
  onOpenChannelsModal,
  onCloseChannelsModal,
  onOpenJoinMenu,
  onCloseJoinMenu,
  onOpenLocaleMenu,
  onCloseLocaleMenu,
  history,
  intl,
}) {
  useInjectReducer({ key: 'mainMenu', reducer });

  const usersBtnToolTip = intl.formatMessage(messages.usersBtnToolTip);
  const channelsBtnToolTip = intl.formatMessage(messages.channelsBtnToolTip);
  const joinBtnToolTip = intl.formatMessage(messages.joinBtnToolTip);
  const languageBtnToolTip = intl.formatMessage(messages.languageBtnToolTip);

  const mainIcon = mainMenuIsOpen ? <MdClose /> : <MdMenu />;
  const menuBtnText = intl.formatMessage(messages.menuBtnToolTip);
  const settingsBtnText = intl.formatMessage(messages.settingsBtnToolTip);

  return (
    <div>
      <Collapse className="fixed-bottom" isOpen={mainMenuIsOpen}>
        <Container fluid>
          <Row className="mx-auto">
            <Col>
              <MenuButton
                onClick={() => {
                  if (ChannelsModalIsOpen) {
                    onCloseUsersModal();
                  } else {
                    onOpenUsersModal();
                  }
                }}
                toolTip={usersBtnToolTip}
              >
                <MdPeople />
              </MenuButton>
              <UsersModal open={usersMenuIsOpen} />
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col>
              <MenuButton
                onClick={() => {
                  if (ChannelsModalIsOpen) {
                    onCloseChannelsModal();
                  } else {
                    onOpenChannelsModal();
                  }
                }}
                toolTip={channelsBtnToolTip}
              >
                <MdForum />
              </MenuButton>
              <ChannelsModal open={ChannelsModalIsOpen} />
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col>
              <MenuButton
                onClick={() => {
                  if (joinMenuIsOpen) {
                    onCloseJoinMenu();
                  } else {
                    onOpenJoinMenu();
                  }
                }}
                toolTip={joinBtnToolTip}
              >
                <FaPlus />
              </MenuButton>
              <JoinModal open={joinMenuIsOpen} />
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col>
              <MenuButton
                onClick={() => {
                  if (localeMenuIsOpen) {
                    onCloseLocaleMenu();
                  } else {
                    onOpenLocaleMenu();
                  }
                }}
                toolTip={languageBtnToolTip}
              >
                <MdLanguage />
              </MenuButton>
              <LocaleModal open={localeMenuIsOpen} />
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col>
              <MenuButton
                onClick={() => {
                  history.push('/settings');
                }}
                toolTip={settingsBtnText}
              >
                <MdSettings />
              </MenuButton>
            </Col>
          </Row>
          <Row>
            <Col>
              <Spacer />
            </Col>
          </Row>
        </Container>
      </Collapse>

      <MenuButton
        isMain
        className="fixed-bottom"
        onClick={() => {
          if (mainMenuIsOpen) {
            onCloseMainMenu();
          } else {
            onOpenMainMenu();
          }
        }}
        toolTip={menuBtnText}
      >
        {mainIcon}
      </MenuButton>
    </div>
  );
}

MainMenu.propTypes = {
  intl: PropTypes.object.isRequired,
  mainMenuIsOpen: PropTypes.bool,
  usersMenuIsOpen: PropTypes.bool,
  ChannelsModalIsOpen: PropTypes.bool,
  joinMenuIsOpen: PropTypes.bool,
  localeMenuIsOpen: PropTypes.bool,
  onOpenMainMenu: PropTypes.func,
  onCloseMainMenu: PropTypes.func,
  onOpenUsersModal: PropTypes.func,
  onCloseUsersModal: PropTypes.func,
  onOpenChannelsModal: PropTypes.func,
  onCloseChannelsModal: PropTypes.func,
  onOpenJoinMenu: PropTypes.func,
  onCloseJoinMenu: PropTypes.func,
  onOpenLocaleMenu: PropTypes.func,
  onCloseLocaleMenu: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  mainMenuIsOpen: makeSelectMainMenuStatus(),
  usersMenuIsOpen: makeSelectUsersMenuStatus(),
  ChannelsModalIsOpen: makeSelectChannelsModalStatus(),
  joinMenuIsOpen: makeSelectJoinMenuStatus(),
  localeMenuIsOpen: makeSelectLocaleMenuStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    onOpenMainMenu: () => dispatch(openMainMenu()),
    onCloseMainMenu: () => dispatch(closeMainMenu()),
    onOpenUsersModal: () => dispatch(openUsersModal()),
    onCloseUsersModal: () => dispatch(closeUsersModal()),
    onOpenChannelsModal: () => dispatch(openChannelsModal()),
    onCloseChannelsModal: () => dispatch(closeChannelsModal()),
    onOpenJoinMenu: () => dispatch(openJoinModal()),
    onCloseJoinMenu: () => dispatch(closeJoinModal()),
    onOpenLocaleMenu: () => dispatch(openLocaleModal()),
    onCloseLocaleMenu: () => dispatch(closeLocaleModal()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter, injectIntl)(MainMenu);
