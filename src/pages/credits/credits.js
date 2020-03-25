import React from 'react';
import {
  Button,
  makeStyles,
  Box,
  CssBaseline,
  Typography,
  Container,
  Grid
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Navbar from '../../components/navbar';

const Credits = ({ history }) => {
  const { title, content } = useStyles();
  return (
    <Box>
      <Navbar />
      <Container maxWidth='lg' disableGutters>
        <CssBaseline />
        <div className={content}>
          <Typography variant='h2' gutterBottom>
            Creditos
          </Typography>
          <Grid container disableGutters spacing={1}>
            <Grid item xs={12} md={6}>
              <Typography variant='h5' className={title} gutterBottom>
                <strong>Equipo Médico</strong>
              </Typography>
              <Typography variant='body1' paragraph>
                Natalia Mora
              </Typography>
              <Typography variant='body1' paragraph>
                Santiago Astaiza
              </Typography>
              <Typography variant='h5' className={title} gutterBottom>
                <strong>Programadores</strong>
              </Typography>
              <Typography variant='body1' paragraph>
                Julian David Torregrosa
              </Typography>
              <Typography variant='body1' paragraph>
                Clovis Rodríguez
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h5' className={title} gutterBottom>
                <strong>Contenidos</strong>
              </Typography>
              <Typography variant='body1' paragraph>
                Freddy Mejia
              </Typography>
              <Typography variant='body1' paragraph>
                Flora Alvarez
              </Typography>
            </Grid>
          </Grid>
          <Grid container disableGutters spacing={1}>
            <Typography variant='body1' paragraph>
              Este trabajo es la suma de todos los colaboradores del proyecto
              junto a QATRO20 COMPANY SAS, si deseas ayudarnos estamos abierto
              a todas las ideas y formas de que pueda seguir creciendo este
              proyecto puedes escribirnos a admin@qatro20.com o al +573002697613
            </Typography>
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
  title: {
    marginBottom: '1rem'
  }
}));

export default withRouter(Credits);
