/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';

const AppRoute = ({ component: Component, layout: Layout, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default AppRoute;
