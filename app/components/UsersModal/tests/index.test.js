/**
 * Users modal tests
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import configureStore from '../../../configureStore';

import UsersModal from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<UsersModal />', () => {
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
          <UsersModal user={user} myLevel={myLevel} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
