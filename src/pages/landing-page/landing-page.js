import React from 'react';
import { Button, makeStyles, Box, CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Background from '../../img/colombia.jpg';

const LandingPage = ({ history }) => {
  const {
    actionsContainer,
    containerBackground,
  } = useStyles();
  const goToStatistics = () => {
    history.push('/statistics');
  };
  const goToForm = () => {
    history.push('/form');
  };
  return (
    <Box className={containerBackground}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">
            Coronavirux
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Box className={actionsContainer}>
        <Button color="secondary" variant="contained" onClick={goToStatistics}>Ver estadísticas</Button>
        <Button color="secondary" variant="contained" onClick={goToForm}>Ver formulario</Button>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  actionsContainer: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '20%',
  },
  containerBackground: {
    background: 'no-repeat center center fixed',
    backgroundImage: `linear-gradient(black, black), url('${Background}')`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'saturation',
    height: '100vh',
  },
}));

export default withRouter(LandingPage);