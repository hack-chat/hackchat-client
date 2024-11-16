/**
 * Base modal tests
 */

import React from 'react';
import { render } from '@testing-library/react';

import InputGroup from '../InputGroup';

describe('<InputGroup />', () => {
  it('should render a <div> tag', () => {
    const { container } = render(<InputGroup />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<InputGroup />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<InputGroup id={id} />);
    expect(container.querySelector('div').id).toEqual(id);
  });
});
