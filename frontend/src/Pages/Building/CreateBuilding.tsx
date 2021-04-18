import { Grid, Paper } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Providers/AppProvider';

const CreateBuilding: React.FC = () => {
  const { title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Buildings - Create');
  }, [title]);

  return (
    <Paper>
      <Grid container />
    </Paper>
  );
};

export default CreateBuilding;
