/**
 * Notification element tests
 */

import React from 'react';
import { render } from '@testing-library/react';

import Notification from '../index';

describe('<Notification />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Notification />);
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });
});
