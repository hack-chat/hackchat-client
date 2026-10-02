/**
 * Communication provider saga tests
 *
 * The saga module instantiates a live hackchat-engine Client (which opens a
 * real WebSocket) at import time, so it is not unit-testable in isolation
 * here; behaviour is exercised end-to-end in the browser build.
 */

/* eslint-disable redux-saga/yield-effects */

describe('communicationProviderSaga Saga', () => {
  it.skip('Expect to have unit tests specified', () => {
    expect(true).toEqual(false);
  });
});
