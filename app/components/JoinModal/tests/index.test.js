/**
 * Join modal tests
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import { JoinModal } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const messages = require('../messages');
const intlProvider = new IntlProvider({ locale: DEFAULT_LOCALE, messages }, {});
const { intl } = intlProvider.getChildContext();

describe('<JoinModal />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <JoinModal dispatch={dispatch} channelData={{}} intl={intl} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });
});
