import thunk from 'redux-thunk';

import reducer from './rootReducer';
import rootSaga from './rootSaga';

import createSagaMiddleware from 'redux-saga';
import { localStorageMiddleware, reHydrateStore } from './configureStore.dev';
import { configureStore } from '@reduxjs/toolkit';

export function getStoreProd() {
  const sagaMiddleware = createSagaMiddleware();

  const createStore = (preloadedState: ReturnType<typeof reHydrateStore>) =>
    configureStore({
      reducer,
      middleware: [thunk, sagaMiddleware, localStorageMiddleware],
      preloadedState,
    });

  const store = createStore(reHydrateStore());
  sagaMiddleware.run(rootSaga);

  return store;
}
