/**
 * Message element tests
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import Message from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<Message />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Message />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
