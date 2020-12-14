/**
 * Menu button tests
 */

import React from 'react';
import { render } from 'react-testing-library';

import MenuButton from '../index';

describe('<MenuButton />', () => {
  it('should render a <button> tag', () => {
    const { container } = render(<MenuButton>Test</MenuButton>);
    expect(container.querySelector('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<MenuButton>Test</MenuButton>);
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });
});
