import {
  Card, CardContent, CardHeader, makeStyles,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Providers/AppProvider';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const ManagementGroup: React.FC = () => {
  const classes = useStyles();
  const { user, title, setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle('Admin');
  }, [title]);

  return (
    <Card className={classes.root}>
      <CardHeader title="Management Group" />
      <CardContent>
        content
      </CardContent>
    </Card>
  );
};

export default ManagementGroup;
