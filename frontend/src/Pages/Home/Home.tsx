import React, { useContext } from 'react';
import { FirebaseAuth } from '../../Providers/AuthProvider';

const Home: React.FC = () => {
  const { user } = useContext(FirebaseAuth);

  return (
    <div>
      Home
      Hello,
      {' '}
      {user ? <p>{user.name}</p> : <p>who are you?</p>}
    </div>
  );
};

export default Home;
