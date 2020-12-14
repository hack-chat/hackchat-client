/**
 * Chat input tests
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import { ChatInput } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<ChatInput />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    const channel = false;
    const onSendChat = jest.fn();

    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ChatInput
          dispatch={dispatch}
          onSendChat={onSendChat}
          channel={channel}
        />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });
});
