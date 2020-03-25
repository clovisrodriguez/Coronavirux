import React from 'react';
import {
  Button,
  makeStyles,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Logo from '../../img/covix.png';

const LandingPage = ({ history }) => {
  const {
    appBar,
    containerBackground,
    introContainer,
    diagContainer,
    logo,
    content
  } = useStyles();
  const goToStatistics = () => {
    history.push('/stats');
  };
  const goToForm = () => {
    history.push('/form');
  };
  const goToCredits = () => {
    history.push('/credits');
  };
  return (
    <Box className={containerBackground}>
      <Container maxWidth='lg' disableGutters>
        <AppBar position='static' className={appBar}>
          <Toolbar>
            <img alt='logo' src={Logo} className={logo} />
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <div className={content}>
          <Grid disableGutters>
            <Grid item md={12} className={introContainer}>
              <Typography variant='h4' gutterBottom>
                ¿Quieres ayudar a combatir el covid-19?
              </Typography>
              <Typography variant='body1' paragraph>
                CoronaViruX es una iniciativa local que quiere:
              </Typography>
              <Typography variant='body1'>
                <strong>1. </strong>Mostrar en un mapa en tiempo real casos
                confirmados
              </Typography>
              <Typography variant='body1'>
                <strong>2. </strong>Evitar que las líneas y los hospitales
                colapsen
              </Typography>
              <Typography variant='body1' paragraph>
                <strong>3. </strong>Orientar a aquellos que sospechan que pueden
                estar contagiados
              </Typography>
            </Grid>
          </Grid>
          <Grid container disableGutters spacing={1}>
            <Grid item xs={12} md={6}>
              <div className={diagContainer}>
                <Typography variant='h5' gutterBottom>
                  Mapa
                </Typography>
                <Typography variant='body1' paragraph>
                  Revisa estadísticas actualizadas con el instituto de salud de
                  casos <strong>probables </strong>y <strong>oficiales</strong>.
                </Typography>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={goToStatistics}
                >
                  Ver estadísticas
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={diagContainer}>
                <Typography variant='h5' gutterBottom>
                  Formulario
                </Typography>
                <Typography variant='body1' paragraph>
                  Te pide datos necesarios para saber el estado de salud de la
                  población por área y generar sugerencias masivas{' '}
                  <strong>sin que vayas a un hospital</strong>.
                </Typography>

                <Typography variant='body1' paragraph>
                  Este formulario fue{' '}
                  <strong>desarrollado junto a médicos</strong> para darte una
                  orientación precisa para que sepas qué tienes qué hacer.
                </Typography>

                <Button
                  color='secondary'
                  variant='contained'
                  onClick={goToForm}
                >
                  Ir al formulario
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12} className={introContainer}>
            <div className={diagContainer}>
              <Typography variant='h5' gutterBottom>
                Deseas apoyar nuestra iniciativa, conoce al equipo de
                coronavirux
              </Typography>
              <Button
                color='primary'
                variant='contained'
                onClick={goToCredits}
              >
                Ir a creditos
              </Button>
            </div>
          </Grid>
        </div>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  content: {
    padding: '2rem',
    paddingTop: '4rem'
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none'
  },
  logo: {
    maxWidth: '150px'
  },
  containerBackground: {
    background:
      'linear-gradient(153deg, rgba(2,0,36,1) 0%, rgba(86,126,255,1) 43%, rgba(212,222,255,1) 100%)',
    backgroundSize: 'cover',
    backgroundBlendMode: 'saturation',
    height: '100%',
    minHeight: '100vh'
  },
  introContainer: {
    color: '#fff9e7',
    padding: '2rem',
    height: '100%'
  },
  diagContainer: {
    color: '#fff9e7',
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '2rem',
    height: '100%'
  },
  virusContainer: {
    maxWidth: '100%',
    height: 'auto',
    padding: '2rem'
  }
}));

export default withRouter(LandingPage);
