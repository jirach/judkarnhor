import {
  makeStyles,
  Paper, Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';

type BuildingListProps = {
    managementGroupId: string,
  }

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const BuildingList: React.FC<BuildingListProps> = ({ managementGroupId }: BuildingListProps) => {
  const classes = useStyles();

  useEffect(() => {
    // Get building
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" gutterBottom>Buildings</Typography>
    </Paper>
  );
};

export default BuildingList;
