/**
 * App is the root ui manager of the application
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import HomePage from 'containers/HomePage/Loadable';
import ToastNotifier from 'containers/ToastNotifier';

import Wrapper from './Wrapper';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <Wrapper>
      <Helmet titleTemplate="%s" defaultTitle="hack.chat">
        <meta
          name="description"
          content="a minimal, distraction-free chat application"
        />
      </Helmet>

      <Routes>
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
  );
}
