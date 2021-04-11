/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAuth } from '../../Providers/AuthProvider';

const Login: React.FC = () => {
  const { handleSignout, errors } = useContext(firebaseAuth);
  const history = useHistory();

  useEffect(() => {
    handleSignout();
    history.push('/');
  });

  return (
    <div>
      {errors.length > 0 ? errors.map((error: any) => <p style={{ color: 'red' }}>{error}</p>) : null}
    </div>
  );
};

export default Login;
