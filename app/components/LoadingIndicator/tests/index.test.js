/**
 * Loading indicator tests
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should render a <div> tag', () => {
    const { root } = renderer.create(<LoadingIndicator />);
    expect(root).not.toBeNull();
  });
});
