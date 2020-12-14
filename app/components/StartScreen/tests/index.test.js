/**
 * Start screen tests
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import configureStore from '../../../configureStore';

import StartScreen from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const messages = require('../messages');
const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
const { intl } = intlProvider.getChildContext();

describe('<StartScreen />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <StartScreen dispatch={dispatch} intl={intl} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
