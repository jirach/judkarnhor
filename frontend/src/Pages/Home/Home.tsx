import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { firebaseAuth } from '../../Providers/AuthProvider';

const Home: React.FC = () => {
  const { signout } = useContext(firebaseAuth);

  return (
    <div>
      Home, login successful!!!!!!
      <Button onClick={signout}>sign out </Button>
    </div>
  );
};

export default Home;
