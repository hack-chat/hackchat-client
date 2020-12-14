/**
 * Communication provider tests
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';

import { CommunicationProvider } from '../index';

describe('<CommunicationProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <CommunicationProvider dispatch={dispatch}>
          <br />
        </CommunicationProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
