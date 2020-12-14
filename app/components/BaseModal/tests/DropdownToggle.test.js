/**
 * Base modal tests
 */

import React from 'react';
import { render } from 'react-testing-library';

import DropdownToggle from '../DropdownToggle';

describe('<DropdownToggle />', () => {
  it('should render a <button> tag', () => {
    const { container } = render(<DropdownToggle />);
    expect(container.querySelector('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<DropdownToggle />);
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<DropdownToggle id={id} />);
    expect(container.querySelector('button').id).toEqual(id);
  });
});
