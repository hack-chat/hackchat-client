/**
 * HomePage will either display the StartScreen or ChatManager depending on
 * the current channel, query string and other channel data
 */

import React, { useEffect, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { changeChannel } from 'containers/CommunicationProvider/actions';
import {
  makeSelectChannel,
  makeSelectChannelData,
  makeSelectMeta,
} from 'containers/CommunicationProvider/selectors';
import { openJoinModal } from 'components/MainMenu/actions';
import { Row, Col } from 'reactstrap';
import Notifier from 'components/Notifier';
import MainMenu from 'components/MainMenu';
import StartScreen from 'components/StartScreen';
import ChatManager from 'containers/ChatManager';

import MainContainer from './MainContainer';

export function HomePage({
  history,
  location,
  channel,
  channelData,
  meta,
  onChangeChannel,
  onOpenJoinModal,
}) {
  const homepageTitle = location.search !== '' ? location.search : 'welcome';
  const qString = location.search.trim().substr(1);
  const [currentView, setView] = useStateIfMounted(1);
  const [lastChannel, setLastChannel] = useStateIfMounted('');

  useEffect(() => {
    if (channel === false && qString !== '') {
      setView(1);
      onOpenJoinModal(qString);
    } else if (channel && qString === '') {
      setLastChannel(channel);
      history.push(`/?${channel}`);
    } else if (channel === qString) {
      setView(2);
      setLastChannel(channel);
    } else if (channel !== qString) {
      if (channel === false) {
        setView(0);
      } else if (typeof channelData[qString] === 'undefined') {
        setView(1);
        onOpenJoinModal(qString);
      } else if (channel === lastChannel) {
        onChangeChannel(qString);
      }
    }
  }, [channel, qString]);

  let homepageView;
  switch (currentView) {
    case 0:
      homepageView = <StartScreen meta={meta} />;
      break;
    case 1:
      homepageView = '';
      break;
    case 2:
      homepageView = <ChatManager />;
      break;
    default:
      homepageView = '';
  }

  return (
    <MainContainer fluid className="p-0">
      <Helmet>
        <title>{homepageTitle}</title>
        <meta
          name="description"
          content="a minimal, distraction-free chat application"
        />
      </Helmet>
      <Row noGutters>
        <Col md="1" sm="1">
          <MainMenu />
        </Col>
        <Col md="10" sm="10">
          {homepageView}
        </Col>
        <Col md="1" sm="0">
          <Notifier />
        </Col>
      </Row>
    </MainContainer>
  );
}

HomePage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  channel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  channelData: PropTypes.object,
  meta: PropTypes.object,
  onChangeChannel: PropTypes.func,
  onOpenJoinModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  channel: makeSelectChannel(),
  channelData: makeSelectChannelData(),
  meta: makeSelectMeta(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeChannel: (channel) => dispatch(changeChannel(channel)),
    onOpenJoinModal: (channel) => dispatch(openJoinModal(channel)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter, memo)(HomePage);
