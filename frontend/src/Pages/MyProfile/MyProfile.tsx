import {
  Grid, makeStyles, Paper, TextField, Typography, Select, InputLabel, MenuItem,
  Button,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import { AppContext } from '../../Providers/AppProvider';
import MGService from '../../Services/MGServices';
import { IManagementGroup } from '../../type.d';
import UserService from '../../Services/UserServices';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  profile: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profilePic: {
    borderRadius: '50%',
    maxWidth: '200px',
  },
}));

const MyProfile: React.FC = () => {
  const { user, title, setTitle } = useContext(AppContext);
  const classes = useStyles();
  const [managementGroup, setManagementGroup] = useState<IManagementGroup[]>([]);
  const [selectedManagementGroup, setSelectedManagementGroup] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTitle('My Profile');
    setSelectedManagementGroup(user.managementGroup.id);

    const fetchManagementGroup = async () => {
      const response = await MGService.getAllManagementGroup();
      setManagementGroup(response.data);
    };
    fetchManagementGroup();
  }, []);

  const handleSave = async () => {
    const matchMG = managementGroup.find((mg) => mg.id === selectedManagementGroup);
    const response = await UserService.updateManagementGroup(user.id, matchMG!);
    if (response.status >= 200 && response.status < 300) {
      setSuccessMessage('Management Group Updated');
      setSelectedManagementGroup(response.data.id);
    } else {
      setErrorMessage('Management Group cannot be update');
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={4}>
          <Paper className={classes.profile}>
            <img className={classes.profilePic} alt={`${user.name}`} src={`${user.photoUrl}`} />
            <Typography variant="h6">
              {user.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Paper className={classes.paper}>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  defaultValue={user.name}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="E-Mail"
                  variant="outlined"
                  defaultValue={user.email}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="managementGroupDD">Management Group</InputLabel>
                <Select
                  labelId="managementGroupDD"
                  value={selectedManagementGroup}
                  defaultValue=""
                  variant="outlined"
                  onChange={(e) => setSelectedManagementGroup(e.target.value as string)}
                  fullWidth
                >
                  {managementGroup && managementGroup.map((mg: any) => (
                    <MenuItem value={mg.id} key={mg.id}>{mg.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleSave}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={12}>
                { errorMessage.length > 0 && <Alert severity="error" onClose={() => { setErrorMessage(''); }}>{errorMessage}</Alert>}
                { successMessage.length > 0 && <Alert severity="success" onClose={() => { setSuccessMessage(''); }}>{successMessage}</Alert>}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProfile;
