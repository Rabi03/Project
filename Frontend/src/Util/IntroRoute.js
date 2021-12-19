import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { AuthContext } from '../Context/Auth';

export default function IntroRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
}
