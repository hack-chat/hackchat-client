/**
 * NotFoundPage is the page displayed when an unknown route is
 * requested
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Jumbotron, Container, Button } from 'reactstrap';
import { MdHome } from 'react-icons/md';

import messages from './messages';

export function NotFoundPage({ history }) {
  return (
    <div>
      <Jumbotron fluid className="bg-dark text-center">
        <Container fluid>
          <h1 className="display-3">
            <FormattedMessage
              id={messages.header.id}
              defaultMessage={messages.header.defaultMessage}
            />
          </h1>
          <p className="lead">¯\_(ツ)_/¯</p>
          <Button onClick={() => history.push('/')} color="secondary">
            <MdHome />
          </Button>
        </Container>
      </Jumbotron>
    </div>
  );
}

NotFoundPage.propTypes = {
  history: PropTypes.object,
};

export default compose(withRouter)(NotFoundPage);
