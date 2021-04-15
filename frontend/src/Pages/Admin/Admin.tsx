import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Providers/AppProvider';

const Admin: React.FC = () => {
  const { user, title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Admin');
  }, [title]);

  return (
    <div>
      Welcome Admin
      {' '}
      {user.name}
    </div>
  );
};

export default Admin;
