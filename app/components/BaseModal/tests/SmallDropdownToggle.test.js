/**
 * Base modal tests
 */

import React from 'react';
import { render } from '@testing-library/react';

import SmallDropdownToggle from '../SmallDropdownToggle';

describe('<SmallDropdownToggle />', () => {
  it('should render a <button> tag', () => {
    const { container } = render(<SmallDropdownToggle />);
    expect(container.querySelector('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<SmallDropdownToggle />);
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<SmallDropdownToggle id={id} />);
    expect(container.querySelector('button').id).toEqual(id);
  });
});
