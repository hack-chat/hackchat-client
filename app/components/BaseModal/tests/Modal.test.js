/**
 * Base modal tests
 */

import React from 'react';
import { render } from '@testing-library/react';

import Modal from '../Modal';

describe('<Modal />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Modal>
        <br />
      </Modal>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
