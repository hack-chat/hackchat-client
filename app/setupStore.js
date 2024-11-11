/**
 * Build the store and reducers
 */

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

// dev debug logging
const logger = (store) => (next) => (action) => {
  // eslint-disable-next-line no-console
  console.group(action.type);
  // eslint-disable-next-line no-console
  console.info('dispatching', action);

  let result = next(action);
  // eslint-disable-next-line no-console
  console.log('next state', store.getState());
  // eslint-disable-next-line no-console
  console.groupEnd();

  return result;
};

/**
 * Exports the main Redux Store reference using passed params
 * @param {object} initialState Initial store data
 * @public
 * @return {redux#Store}
 */
export default function setupStore(initialState = {}) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    middlewares.push(logger);
  }

  const store = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(middlewares),
    preloadedState: initialState,
  });

  // Add extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Add hot reload if we are in dev mode
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
