/**
 * four oh bloody four page soul sucking unit testing script
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';

import NotFoundPage from '../index';
import messages from '../messages';

describe('<NotFoundPage />', () => {
  it('should render the "Um, no?" text', () => {
    const { queryByText } = render(
      <Router>
        <IntlProvider locale="en">
          <NotFoundPage />
        </IntlProvider>
      </Router>,
    );
    expect(queryByText(messages.header.defaultMessage)).not.toBeNull();
  });
});
