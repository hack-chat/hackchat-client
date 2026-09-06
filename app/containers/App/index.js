/**
 * App is the root ui manager of the application
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ThemeProvider } from 'styled-components';

import HomePage from 'containers/HomePage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import ToastNotifier from 'containers/ToastNotifier';

import { makeSelectCachedTheme } from 'containers/SettingsPage/selectors';
import defaultThemeObj from '../../themes/default';

import Wrapper from './Wrapper';
import GlobalStyle from '../../global-styles';

function App({ cachedTheme }) {
  const [activeTheme, setActiveTheme] = useState(defaultThemeObj);

  useEffect(() => {
    let isMounted = true;

    const loadTheme = async () => {
      try {
        const themeModule = await import(
          /* webpackChunkName: "theme-[request]" */
          `../../themes/${cachedTheme}.js`
        );

        if (isMounted) {
          setActiveTheme(themeModule.default);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to load theme: ${cachedTheme}`, error);
        if (isMounted) setActiveTheme(defaultThemeObj);
      }
    };

    loadTheme();

    return () => {
      isMounted = false;
    };
  }, [cachedTheme]);

  return (
    <ThemeProvider theme={activeTheme}>
      <Wrapper>
        <Helmet titleTemplate="%s" defaultTitle="hack.chat">
          <meta
            name="description"
            content="a minimal, distraction-free chat application"
          />
        </Helmet>

        <Routes>
          <Route exact path="/settings" Component={SettingsPage} />
          <Route path="*" Component={HomePage} />
        </Routes>

        <ToastNotifier />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="dark"
          transition={Slide}
        />

        <GlobalStyle />
      </Wrapper>
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  cachedTheme: makeSelectCachedTheme(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(App);
