import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Providers/AppProvider';

const Report: React.FC = () => {
  const { title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Reports');
  }, [title]);

  return (
    <div>
      Reports
    </div>
  );
};

export default Report;
