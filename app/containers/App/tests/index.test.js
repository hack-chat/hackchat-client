/**
 * App wrapper tests
 */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from '../index';

const renderer = new ShallowRenderer();

describe('<App />', () => {
  it('should render a <div> tag', () => {
    renderer.render(<App />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput.querySelector('div')).not.toBeNull();
  });
});
