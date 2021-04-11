import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { firebaseAuth } from '../../Providers/AuthProvider';

const Home: React.FC = () => {
  const { user } = useContext(firebaseAuth);

  return (
    <div>
      Home
      Hello,
      {' '}
      {user ? <p>Logged In User</p> : <p>who are you?</p>}
    </div>
  );
};

export default Home;
