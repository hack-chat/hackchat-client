/**
 * Home page tests
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter as Router } from 'react-router-dom';

import { HomePage, mapDispatchToProps } from '../index';
import configureStore from '../../../configureStore';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  const location = {
    search: '',
  };

  const meta = {
    channels: {},
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    const onOpenJoinModal = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <HomePage
              dispatch={dispatch}
              location={location}
              channel={false}
              meta={meta}
              onOpenJoinModal={onOpenJoinModal}
            />
          </IntlProvider>
        </Provider>
      </Router>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChannelChange', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChannelChange).toBeDefined();
      });
    });

    describe('onOpenJoinModal', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onOpenJoinModal).toBeDefined();
      });
    });
  });
});
