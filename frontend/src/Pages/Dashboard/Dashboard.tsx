import React, { useContext, useEffect } from 'react';
import BuildingList from '../../Components/BuildingList/BuildingList';
import { AppContext } from '../../Providers/AppProvider';

const Dashboard: React.FC = () => {
  const { user, title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Dashboard');
  }, [title]);

  return (
    <div>
      <BuildingList managementGroupId="0yTsAe7OzDqFL9qFf3f0" />
    </div>
  );
};

export default Dashboard;
