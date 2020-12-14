/**
 * Base modal tests
 */

import React from 'react';
import { render } from 'react-testing-library';

import DropdownItem from '../DropdownItem';

describe('<DropdownItem />', () => {
  it('should render a <button> tag', () => {
    const { container } = render(<DropdownItem />);
    expect(container.querySelector('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<DropdownItem />);
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<DropdownItem id={id} />);
    expect(container.querySelector('button').id).toEqual(id);
  });
});
