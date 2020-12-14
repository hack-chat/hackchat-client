/**
 * Channel item tests
 */

import React from 'react';
import { render } from 'react-testing-library';

import LeaveChannelLabel from '../LeaveChannelLabel';

describe('<ChannelButton />', () => {
  it('should render a <span> tag', () => {
    const { container } = render(<LeaveChannelLabel />);
    expect(container.querySelector('span')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<LeaveChannelLabel />);
    expect(container.querySelector('span').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<LeaveChannelLabel id={id} />);
    expect(container.querySelector('span').id).toEqual(id);
  });
});
