/**
 * Base modal tests
 */

import React from 'react';
import { render } from 'react-testing-library';

import InputGroupText from '../InputGroupText';

describe('<InputGroup />', () => {
  it('should render a <div> tag', () => {
    const { container } = render(<InputGroupText addonType="append" />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<InputGroupText addonType="append" />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(
      <InputGroupText addonType="append" id={id} />,
    );
    expect(container.querySelector('div').id).toEqual(id);
  });
});
