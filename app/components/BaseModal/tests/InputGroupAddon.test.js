/**
 * Base modal tests
 */

import React from 'react';
import { render } from 'react-testing-library';

import InputGroupAddon from '../InputGroupAddon';

describe('<InputGroup />', () => {
  it('should render a <div> tag', () => {
    const { container } = render(<InputGroupAddon addonType="append" />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<InputGroupAddon addonType="append" />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(
      <InputGroupAddon addonType="append" id={id} />,
    );
    expect(container.querySelector('div').id).toEqual(id);
  });
});
