import React, { useContext } from 'react';
import { FirebaseAuth } from '../../Providers/AuthProvider';

const Dashboard: React.FC = () => {
  const { user } = useContext(FirebaseAuth);
  return (
    <div>
      Dashboard Page,
      {' '}
      {user.name}
    </div>
  );
};

export default Dashboard;
