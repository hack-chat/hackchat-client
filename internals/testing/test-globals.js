/**
 * Backfills the jest 1.x BDD globals (describe/it/beforeEach/beforeAll)
 * that this repo's tests rely on but modern jest no longer injects.
 * `it` delegates to jest's own `test()` so tests are registered.
 */

const pendingBeforeEach = [];

global.beforeEach = (fn) => {
  pendingBeforeEach.push(fn);
};

global.beforeAll = (fn) => {
  fn();
};

global.it = (name, fn) => {
  const setups = pendingBeforeEach.slice();
  global.test(name, () => {
    setups.forEach((setup) => setup());
    fn();
  });
};

global.it.skip = (name, fn) => {
  global.test(name, () => {});
};

global.describe = (name, fn) => {
  fn();
};
