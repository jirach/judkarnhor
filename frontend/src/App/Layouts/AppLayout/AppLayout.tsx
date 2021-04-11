/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  Hidden,
  ListItem, ListItemIcon, ListItemText, useTheme,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../../../Providers/AppProvider';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AppLayout: React.FC = (props: any) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { title } = useContext(AppContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/building">
          <ListItemIcon>
            <ApartmentIcon />
          </ListItemIcon>
          <ListItemText primary="Buildings" />
        </ListItem>
        <ListItem button component={Link} to="/report">
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/logout">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { props.children }
      </main>
    </div>

  // <div className={classes.root}>
  //   <CssBaseline />
  //   <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
  //     <Toolbar className={classes.toolbar}>
  //       <IconButton
  //         edge="start"
  //         color="inherit"
  //         aria-label="open drawer"
  //         onClick={handleDrawerOpen}
  //         className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
  //       >
  //         <MenuIcon />
  //       </IconButton>
  //       <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
  //         Dashboard
  //       </Typography>
  //     </Toolbar>
  //   </AppBar>
  //   <Drawer
  //     variant="permanent"
  //     classes={{
  //       paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
  //     }}
  //     open={open}
  //   >
  //     <div className={classes.toolbarIcon}>
  //       <IconButton onClick={handleDrawerClose}>
  //         <ChevronLeftIcon />
  //       </IconButton>
  //     </div>
  //     <Divider />
  //     <List>
  //       <ListItem button component={Link} to="/">
  //         <ListItemIcon>
  //           <DashboardIcon />
  //         </ListItemIcon>
  //         <ListItemText primary="Home" />
  //       </ListItem>
  //       <ListItem button component={Link} to="/dashboard">
  //         <ListItemIcon>
  //           <DashboardIcon />
  //         </ListItemIcon>
  //         <ListItemText primary="Dashboard" />
  //       </ListItem>
  //       <ListItem button component={Link} to="/login">
  //         <ListItemIcon>
  //           <ShoppingCartIcon />
  //         </ListItemIcon>
  //         <ListItemText primary="Login" />
  //       </ListItem>
  //       <ListItem button component={Link} to="/logout">
  //         <ListItemIcon>
  //           <ShoppingCartIcon />
  //         </ListItemIcon>
  //         <ListItemText primary="Logout" />
  //       </ListItem>
  //     </List>
  //   </Drawer>
  //   <main className={classes.content}>
  //     <div className={classes.appBarSpacer} />
  //     { children }
  //   </main>
  // </div>
  );
};

AppLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AppLayout;
