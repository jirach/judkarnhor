/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppContext } from '../../Providers/AppProvider';

const AppRoute = ({ component: Component, layout: Layout, ...rest }: any) => {
  const { user } = useContext(AppContext);

  if ((user && user.isLoaded) || !rest.needAuthen) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    );
  }

  return (<Redirect to="/login" />);
};

export default AppRoute;
