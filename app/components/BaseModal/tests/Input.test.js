/**
 * Base modal tests
 */

import React from 'react';
import { render } from 'react-testing-library';

import Input from '../Input';

describe('<Input />', () => {
  it('should render an <input> tag', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('input')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('input').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Input id={id} />);
    expect(container.querySelector('input').id).toEqual(id);
  });
});
