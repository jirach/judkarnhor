import {
  Button, Grid, makeStyles, Paper, Typography, TextField,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React, { useContext, useEffect, useState } from 'react';
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
  buildingPhoto: {
    maxWidth: '250px',
    maxHeight: '250px',
  },
  createButton: {
    marginTop: theme.spacing(2),
  },
}));

const CreateBuilding: React.FC = () => {
  const { user, title, setTitle } = useContext(AppContext);
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [buildingNameError, setBuildingNameError] = useState(false);

  useEffect(() => {
    setTitle('Buildings - Create');
  }, []);

  const handleFileSelected = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleCreateBuilding = (e: any) => {
    e.preventDefault();

    // Validation
    if (!buildingName) {
      setBuildingNameError(true);
      return;
    }
    setBuildingNameError(false);

    // Call API to create building
    console.log('creating building');
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Create new building</Typography>
        </Grid>
        <Grid item xs={12} lg={3} className={classes.buildingPhotoContainer}>
          {!fileUrl
            ? (
              <div className={classes.buildingPhotoPlaceholder}>
                <label htmlFor="contained-button-file">
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleFileSelected}
                  />
                  <Button startIcon={<CloudUploadIcon />} component="span">
                    Upload new image
                  </Button>
                </label>
              </div>
            )
            : (
              <div className={classes.buildingPhotoContainer}>
                <img alt="Building" src={fileUrl} className={classes.buildingPhoto} />
                <label htmlFor="contained-button-file">
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleFileSelected}
                  />
                  <Button startIcon={<CloudUploadIcon />} component="span">
                    Upload new image
                  </Button>
                </label>
              </div>
            ) }
        </Grid>
        <Grid item xs={12} lg={9}>
          <div>
            <b>Management Group:</b>
            {` ${user.managementGroup.name}`}
          </div>
          <form autoComplete="off">
            <TextField
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              id="building-name"
              label="Building Name"
              fullWidth
              error={buildingNameError}
            />
            <Button
              className={classes.createButton}
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleCreateBuilding}
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
