/**
 * This is the entry file for the application
 */

import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'highlight.js/styles/atom-one-dark.css';
import 'sanitize.css/sanitize.css';

import App from 'containers/App';
import CommunicationProvider from 'containers/CommunicationProvider';
import LanguageProvider from 'containers/LanguageProvider';

import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions
// import 'file-loader?name=config.json!./config.json'; // eslint-disable-line import/extensions
import 'bootstrap/dist/css/bootstrap.css';

import configureStore from './configureStore';

import { translationMessages } from './i18n';

const initialState = {}; // @todo load local storage
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

// Main render
const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <CommunicationProvider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </CommunicationProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

// Add dev mode helpers
if (module.hot) {
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
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
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/ar.js'),
        import('intl/locale-data/jsonp/bn.js'),
        import('intl/locale-data/jsonp/de.js'),
        import('intl/locale-data/jsonp/el.js'),
        import('intl/locale-data/jsonp/es.js'),
        import('intl/locale-data/jsonp/fa.js'),
        import('intl/locale-data/jsonp/fi.js'),
        import('intl/locale-data/jsonp/fr.js'),
        import('intl/locale-data/jsonp/hi.js'),
        import('intl/locale-data/jsonp/id.js'),
        import('intl/locale-data/jsonp/it.js'),
        import('intl/locale-data/jsonp/ja.js'),
        import('intl/locale-data/jsonp/pt.js'),
        import('intl/locale-data/jsonp/ru.js'),
        import('intl/locale-data/jsonp/tr.js'),
        import('intl/locale-data/jsonp/zh.js'),
      ]),
    ) // eslint-disable-line prettier/prettier
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
        // eslint-disable-next-line no-unused-vars
        .then((registration) => {
          // console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          // eslint-disable-next-line no-console
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
