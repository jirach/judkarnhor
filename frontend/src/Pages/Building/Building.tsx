import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Providers/AppProvider';

const Building: React.FC = () => {
  const { title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Buildings');
  }, [title]);

  return (
    <div>
      Building
    </div>
  );
};

export default Building;
