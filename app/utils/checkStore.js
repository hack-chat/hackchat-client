/**
 * Exports function to validate the current store for early
 * error checking
 */

import { conformsTo, isFunction, isObject } from 'lodash';
import invariant from 'invariant';

/**
 * Check store object integrity and emit error if invalid
 * @param store Redux store instance
 */
export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject,
  };

  invariant(
    conformsTo(store, shape),
    '(app/utils...) injectors: Expected a valid redux store',
  );
}
