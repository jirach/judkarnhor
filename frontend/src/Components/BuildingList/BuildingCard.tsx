import React, { useContext } from 'react';
import { AppContext } from '../../Providers/AppProvider';

const BuildingCard: React.FC = () => {
  const { user } = useContext(AppContext);

  return (
    <div>
      BuildingCard
    </div>
  );
};

export default BuildingCard;
