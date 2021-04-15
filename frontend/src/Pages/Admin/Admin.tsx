import React, { useContext, useEffect } from 'react';
import ManagementGroup from '../../Components/ManagementGroup/ManagementGroup';
import { AppContext } from '../../Providers/AppProvider';

const Admin: React.FC = () => {
  const { user, title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Admin');
  }, [title]);

  return (
    <div>
      <ManagementGroup />
    </div>
  );
};

export default Admin;
