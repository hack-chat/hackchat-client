/**
 * StartScreen exports the ui rendering functions to display the default application screen
 * @todo Make Banner message loadable from the config.js file
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container, Row, Col } from 'reactstrap';
import DOMPurify from 'dompurify';

import { openJoinModal } from 'components/MainMenu/actions';
import { Button } from 'components/BaseModal';
import Banner from './Banner';
import Section from './Section';
import messages from './messages';

function StartScreen({ meta, onOpenJoinMenu, intl }) {
  const createOrJoinLabel = intl.formatMessage(messages.createOrJoinLabel);

  const channelNames = Object.keys(meta.channels);
  const publicChannels = [];
  for (let i = 0, j = channelNames.length; i < j; i += 1) {
    const key = `pchan-${i}`;

    publicChannels.push(
      <Row key={key}>
        <Col className="col-4" />
        <Col className="text-center">
          <Link
            key={`invite-${Math.random() * 9999}`}
            to={`/?${DOMPurify.sanitize(channelNames[i])}`}
          >
            ?{DOMPurify.sanitize(channelNames[i])}
          </Link>
          : {meta.channels[channelNames[i]]}
        </Col>
        <Col className="text-center">
          <Link
            key={`invite-${Math.random() * 9999}`}
            to={`/?${DOMPurify.sanitize(channelNames[(i += 1)])}`}
          >
            ?{DOMPurify.sanitize(channelNames[i])}
          </Link>
          : {meta.channels[channelNames[i]]}
        </Col>
        <Col className="col-4" />
      </Row>,
    );
  }

  return (
    <Container fluid>
      <Row center="xs">
        <Col xs />
        <Col xs className="text-center">
          <Banner>
            {`
 _           _         _       _
| |_ ___ ___| |_   ___| |_ ___| |_
|   |_ ||  _| '_| |  _|   |_ ||  _|
|_|_|__/|___|_,_|.|___|_|_|__/|_|
            `}
          </Banner>
        </Col>
        <Col xs />
      </Row>
      <Row>
        <Col className="text-center">
          <h4>
            <FormattedMessage
              id={messages.tagline.id}
              defaultMessage={messages.tagline.defaultMessage}
            />
          </h4>
          <br />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button onClick={onOpenJoinMenu}>{createOrJoinLabel}</Button>
          <br />
          <br />
          <FormattedMessage
            id={messages.channelInfo.id}
            defaultMessage={messages.channelInfo.defaultMessage}
          />
          <br />
          <br />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h4>
            <FormattedMessage
              id={messages.publicChannelsHeader.id}
              defaultMessage={messages.publicChannelsHeader.defaultMessage}
            />
          </h4>
        </Col>
      </Row>
      {publicChannels}
      <br />
      <br />
      <Row>
        <Col className="text-center">
          <h4>
            <FormattedMessage
              id={messages.formattingHeader.id}
              defaultMessage={messages.formattingHeader.defaultMessage}
            />
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Section>
            <FormattedMessage
              id={messages.formattingMd.id}
              defaultMessage={messages.formattingMd.defaultMessage}
            />
            <br />
            <FormattedMessage
              id={messages.formattingLatex.id}
              defaultMessage={messages.formattingLatex.defaultMessage}
            />
            <br />
            <FormattedMessage
              id={messages.formattingCode.id}
              defaultMessage={messages.formattingCode.defaultMessage}
            />
            <br />
          </Section>
        </Col>
      </Row>
      <Row>
        <Col>
          <Section>
            <FormattedMessage
              id={messages.currentGithub.id}
              defaultMessage={messages.currentGithub.defaultMessage}
            />{' '}
            https://github.com/hack-chat
            <br />
            <FormattedMessage
              id={messages.currentGithub.id}
              defaultMessage={messages.currentGithub.defaultMessage}
            />{' '}
            https://github.com/AndrewBelt/hack.chat
            <br />
            <FormattedMessage
              id={messages.thirdParty.id}
              defaultMessage={messages.thirdParty.defaultMessage}
            />
            <br />
            https://github.com/hack-chat/3rd-party-software-list
            <br />
          </Section>
        </Col>
      </Row>
      <Row>
        <Col>
          <Section>
            <FormattedMessage
              id={messages.legal.id}
              defaultMessage={messages.legal.defaultMessage}
            />
          </Section>
        </Col>
      </Row>
    </Container>
  );
}

StartScreen.propTypes = {
  meta: PropTypes.object,
  onOpenJoinMenu: PropTypes.func,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    onOpenJoinMenu: () => dispatch(openJoinModal()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(StartScreen);
