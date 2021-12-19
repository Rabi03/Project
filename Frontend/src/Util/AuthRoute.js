import React, { useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/Auth';

export default function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const GoBack = () => {
    history.goBack();
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to='/home' /> : <Component {...props} />
      }
    />
  );
}
