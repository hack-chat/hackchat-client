/**
 * Minimal localStorage polyfill for the Node test environment.
 * Must load in `setupFiles` (before test modules import app code that
 * touches localStorage at module scope).
 */

if (typeof global.localStorage === 'undefined') {
  const store = {};
  global.localStorage = {
    getItem: (key) =>
      Object.prototype.hasOwnProperty(store, key) ? store[key] : null,
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      for (const k of Object.keys(store)) delete store[k];
    },
  };
}
