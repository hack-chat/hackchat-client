/**
 * This is the entry file for the application
 */

import '@babel/polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import 'katex/dist/katex.min.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'sanitize.css/sanitize.css';

import App from 'containers/App';
import CommunicationProvider from 'containers/CommunicationProvider';
import LanguageProvider from 'containers/LanguageProvider';

import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
import 'config.json';
import 'bootstrap/dist/css/bootstrap.css';

import setupStore from './setupStore';

import { translationMessages } from './i18n';

const initialState = {}; // @todo load local storage
const store = setupStore(initialState);
const mountNode = document.getElementById('app');
const root = createRoot(mountNode);

// Main render
const render = (messages) => {
  root.render(
    <Provider store={store}>
      <CommunicationProvider store={store}>
        <LanguageProvider messages={messages}>
          <Router>
            <App />
          </Router>
        </LanguageProvider>
      </CommunicationProvider>
    </Provider>,
  );
};

// Add dev mode helpers
if (module.hot) {
  module.hot.accept(['./i18n', 'containers/App'], () => {
    // root.unmount();
    render(translationMessages);
  });
}

// Initialize internationization
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en'),
        import('intl/locale-data/jsonp/ar'),
        import('intl/locale-data/jsonp/bn'),
        import('intl/locale-data/jsonp/de'),
        import('intl/locale-data/jsonp/el'),
        import('intl/locale-data/jsonp/es'),
        import('intl/locale-data/jsonp/fa'),
        import('intl/locale-data/jsonp/fi'),
        import('intl/locale-data/jsonp/fr'),
        import('intl/locale-data/jsonp/hi'),
        import('intl/locale-data/jsonp/id'),
        import('intl/locale-data/jsonp/it'),
        import('intl/locale-data/jsonp/ja'),
        import('intl/locale-data/jsonp/pt'),
        import('intl/locale-data/jsonp/ru'),
        import('intl/locale-data/jsonp/tr'),
        import('intl/locale-data/jsonp/zh'),
      ]),
    )
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Create the main service worker
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          // eslint-disable-next-line no-console
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
