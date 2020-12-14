/**
 * Base modal tests
 */

import React from 'react';
import { render } from 'react-testing-library';

import DropdownMenu from '../DropdownMenu';

describe('<DropdownMenu />', () => {
  it('should render a <div> tag', () => {
    const { container } = render(
      <DropdownMenu>
        <br />
      </DropdownMenu>,
    );
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(
      <DropdownMenu>
        <br />
      </DropdownMenu>,
    );
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(
      <DropdownMenu id={id}>
        <br />
      </DropdownMenu>,
    );
    expect(container.querySelector('div').id).toEqual(id);
  });
});
