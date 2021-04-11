import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Providers/AppProvider';

const Dashboard: React.FC = () => {
  const { user, title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Dashboard');
  }, [title]);

  return (
    <div>
      Dashboard Page,
      {' '}
      {user.name}
    </div>
  );
};

export default Dashboard;
