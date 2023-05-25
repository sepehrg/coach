import React, { Suspense } from 'react';
import App from './App';
import './assets/fonts/futurawin.ttf';
// import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux';
import 'assets/styles/global.sass';
import { createRoot } from 'react-dom/client';
import { getStoreDev } from 'store/configureStore.dev';
import { getStoreProd } from 'store/configureStore.prod';

const domNode = document.getElementById('root');
if (!domNode) {
  throw new Error('Could not find root element');
}
const root = createRoot(domNode);
const store = import.meta.env.MODE === 'development' ? getStoreDev() : getStoreProd();

root.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading....</div>}>
      <div id="rotate-device">
        <App />
      </div>
    </Suspense>
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
