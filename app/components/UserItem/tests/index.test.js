/**
 * User item tests
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import configureStore from '../../../configureStore';

import UserItem from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<UserItem />', () => {
  let store;
  const user = {
    name: 'test',
    isBlocked: false,
  };
  const myLevel = 'user';

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <UserItem user={user} myLevel={myLevel} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
