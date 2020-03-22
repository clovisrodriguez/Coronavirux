import React from 'react';
import { AppBar, Toolbar, makeStyles, IconButton, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import Logo from '../../img/covix.png';
import { withRouter } from 'react-router-dom';

const Navbar = ({ title, history }) => {
  const { logo, titleContainer } = useStyles();
  const goToLandingPage = () => {
    history.push('/');
  };
  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton onClick={goToLandingPage}>
          <img alt={'logo'} src={Logo} className={logo} />
        </IconButton>
        <Typography variant="h6" className={titleContainer}>
          {title}
        </Typography>
        <IconButton color="inherit" aria-label="home" onClick={goToLandingPage}>
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  titleContainer: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: '150px',
  },
}));
export default withRouter(Navbar);