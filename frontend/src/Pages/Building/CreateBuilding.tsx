import {
  Button, Grid, makeStyles, Paper, Typography, TextField,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import userEvent from '@testing-library/user-event';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Providers/AppProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  buildingPhotoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buildingPhotoPlaceholder: {
    minWidth: '250px',
    minHeight: '250px',
    background: '#dedede',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    marginTop: theme.spacing(2),
  },
}));

const CreateBuilding: React.FC = () => {
  const { user, title, setTitle } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    setTitle('Buildings - Create');
  }, []);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Create new building</Typography>
        </Grid>
        <Grid item xs={12} lg={3} className={classes.buildingPhotoContainer}>
          <div className={classes.buildingPhotoPlaceholder}>
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button startIcon={<CloudUploadIcon />} component="span">
                Upload new image
              </Button>
            </label>
          </div>
        </Grid>
        <Grid item xs={12} lg={9}>
          <div>
            <b>Management Group:</b>
            {` ${user.managementGroup.name}`}
          </div>
          <form autoComplete="off">
            <TextField id="building-name" label="Building Name" fullWidth />
            <Button
              className={classes.createButton}
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Building
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateBuilding;
