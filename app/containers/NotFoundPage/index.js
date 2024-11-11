/**
 * NotFoundPage is the page displayed when an unknown route is
 * requested
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import { MdHome } from 'react-icons/md';

import messages from './messages';

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <div fluid="true" className="bg-dark text-center">
        <Container fluid>
          <h1 className="display-3">
            <FormattedMessage
              id={messages.header.id}
              defaultMessage={messages.header.defaultMessage}
            />
          </h1>
          <p className="lead">¯\_(ツ)_/¯</p>
          <Button onClick={handleGoBack} color="secondary">
            <MdHome />
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default NotFoundPage;
