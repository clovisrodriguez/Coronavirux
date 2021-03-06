import React from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Typography
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ReactGA from 'react-ga';

import Logo from '../../img/covix.png';
import { withRouter } from 'react-router-dom';


const Navbar = ({ title, history }) => {
  ReactGA.pageview(window.location.pathname + window.location.search);
  const { logo, titleContainer } = useStyles();
  const goToLandingPage = () => {
    history.push('/');
  };
  const goToCredits = () => {
    history.push('/credits');
  };
  return (
    <AppBar position='relative'>
      <Toolbar>
        <IconButton onClick={goToLandingPage}>
          <img alt={'logo'} src={Logo} className={logo} />
        </IconButton>
        <Typography variant='h6' className={titleContainer}>
          {title}
        </Typography>
        <IconButton color='inherit' aria-label='home' onClick={goToLandingPage}>
          <HomeIcon />
        </IconButton>
        <Typography
          variant='h6'
          onClick={goToCredits}
          style={{ cursor: 'pointer' }}
        >
          Creditos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  titleContainer: {
    flexGrow: 1
  },
  logo: {
    maxWidth: '150px'
  }
}));
export default withRouter(Navbar);
