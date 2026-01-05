/**
 * WalletLayer
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';

import { WalletLayer } from '../index';

describe('<WalletLayer />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <WalletLayer dispatch={dispatch}>
          <br />
        </WalletLayer>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
