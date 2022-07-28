import React from 'react';
import publicRouter from 'constant/publicRouter';
import { Routes, Route } from 'react-router-dom';
import appRouter from 'constant/AppRouter';
import Layout from 'layout/layout';
import './styles/reset.sass';
import useAuth from 'hook/useAuth';
import Login from 'views/login/login';

function App() {
  const user = useAuth();
  const publicRouterRender = () => {
    const xhtml = publicRouter.map((router) => (
      <Route path={router.path} element={router.component} key={router.path} />
    ));

    return xhtml;
  };

  const appRouterRender = () => {
    const xhtml = appRouter.map((router) => (
      <Route path={router.path} element={router.component} key={router.path} />
    ));

    return xhtml;
  };

  return (

    <Layout>
      <Routes>
        {publicRouterRender()}
        {appRouterRender()}
      </Routes>
    </Layout>
  );
}

export default App;
