/**
 * Channel item tests
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter as Router } from 'react-router-dom';

import configureStore from '../../../configureStore';

import ChannelItem from '../index';

import { DEFAULT_LOCALE } from '../../../i18n';

describe('<ChannelItem />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render a <button> tag', () => {
    const { container } = render(
      <Router>
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <ChannelItem />
          </IntlProvider>
        </Provider>
      </Router>,
    );
    expect(container.querySelector('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(
      <Router>
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <ChannelItem />
          </IntlProvider>
        </Provider>
      </Router>,
    );
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });
});
