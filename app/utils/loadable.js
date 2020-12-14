/* eslint react/jsx-props-no-spreading: 0 */

/**
 * Exports the code that allows for dynamic code splitting
 */

import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);

  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
