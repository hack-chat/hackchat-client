/**
 * Settings page tests
 */

import { selectSettingsPageDomain } from '../selectors';

describe('selectSettingsPageDomain', () => {
  it('should select the home state', () => {
    const settingsState = {};
    const mockedState = {
      settingsPage: settingsState,
    };
    expect(selectSettingsPageDomain(mockedState)).toEqual(settingsState);
  });
});
