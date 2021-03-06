import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Providers/AppProvider';

const Building: React.FC = () => {
  const { title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Buildings');
  }, [title]);

  return (
    <div>
      Building
      <Link to="/building/create">Create</Link>
    </div>
  );
};

export default Building;
