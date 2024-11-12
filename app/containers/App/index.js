/**
 * App is the root ui manager of the application
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - hack.chat" defaultTitle="hack.chat">
        <meta
          name="description"
          content="a minimal, distraction-free chat application"
        />
      </Helmet>

      <Header />

      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route exact path="/settings" Component={SettingsPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>

      <GlobalStyle />
    </AppWrapper>
  );
}
