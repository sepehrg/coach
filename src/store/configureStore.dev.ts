import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import reducer, { RootState } from './rootReducer';
import rootSaga from './rootSaga';
// import logger from 'redux-logger'

export const localStorageMiddleware: Middleware<object, RootState> = () => {
  return (next: (arg0: any) => any) => (action: any) => {
    return next(action);
  };
};

export const reHydrateStore = () => {
  if (localStorage.getItem('greeting') !== null) {
    return { ido: { idoActions: [JSON.parse(localStorage.getItem('greeting') || '')] } };
  }
};

export function getStoreDev() {
  const sagaMiddleware = createSagaMiddleware();
  const createStore = (preloadedState: ReturnType<typeof reHydrateStore>) => {
    const store = configureStore({
      reducer,
      middleware: [thunk, sagaMiddleware, localStorageMiddleware],
      preloadedState,
    });

    if (import.meta.hot) {
      // Enable Webpack hot module replacement for reducers
      import.meta.hot.accept('./rootReducer', () => {
        store.replaceReducer(reducer);
      });
    }

    return store;
  };

  const store = createStore(reHydrateStore());
  sagaMiddleware.run(rootSaga);

  return store;
}
