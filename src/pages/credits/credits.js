import React from 'react';
import {
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
              <Typography variant='body1' paragraph>
                David Martinez, practicante
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
              Y en el mensaje: Este trabajo es la suma de todos los
              colaboradores del proyecto. Coronavirux es una inciativa de
              QATRO20 COMPANY. Si deseas ayudarnos, estamos abiertos a todo tipo
              de propuestas, ideas, alianzas que permitan llevar esta solución a
              otro nivel. Que tenga más impacto y que cumpla con su propósito,
              sacar el covid-19 a como de lugar. para contactarnos puedes escribirnos a admin@qatro20.com o a whatsapp al número +57 300 2697613
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
