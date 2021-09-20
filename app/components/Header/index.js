/**
 * Header is the gradient line at the top of the application
 * @ummmm Originally I was going to have this change styles based on if the app
 * is connected to the server or not. Currently this is done in a warning notification.
 * I am writting this as a note because maybe one day this will actually be a thing and
 * didn't want to have anyone confused about the name. I guess I could just have implemented
 * that feature instead of writing this note, but am trying to focus on losing my sanity by
 * cleaning, commenting and writing unit tests. Guess I'll just mark this one as:
 * @todo
 * @deargodihateunittests
 * @cryforhelp
 */

import React from 'react';
import { Row, Col } from 'reactstrap';
import ConnectionStatus from './ConnectionStatus';

function Header() {
  return (
    <Row className="g-0">
      <Col>
        <ConnectionStatus />
      </Col>
    </Row>
  );
}

export default Header;
