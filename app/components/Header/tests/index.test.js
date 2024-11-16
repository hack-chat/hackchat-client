import React from 'react';
import { render } from '@testing-library/react';

import Header from '../index';

describe('<Header />', () => {
  it('should render a <div> tag', () => {
    const { container } = render(
      <Header />,
    );

    expect(container.querySelector('div')).not.toBeNull();
  });
});
