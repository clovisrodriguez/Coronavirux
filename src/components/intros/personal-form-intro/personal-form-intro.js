import React from 'react';
import { Typography, Container, Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const PersonalFormIntro = ({ location, setLocation, onNext }) => {
  const getLocationFromWebBrowser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      setLocation({
        lat: 0.0,
        lng: 0.0
      });
    }
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant="body1" align='center' paragraph>
        A continuación vamos a hacerte unas preguntas básicas para conocer un
        poco más sobre ti
      </Typography>
      <Button
        fullWidth
        variant='contained'
        color='secondary'
        onClick={onNext}
        // disabled={!location}
      >
        Comencemos
      </Button>
      {!location && <LinearProgress />}
      <Button
        fullWidth
        variant='contained'
        color='secondary'
        onClick={getLocationFromWebBrowser}
        // disabled={location} unccoment for produc
      >
        Activar localización
      </Button>
      <Typography align='center' variant='caption'>
        Por favor habilita tu localización para iniciar el test, si tienes
        problemas para iniciar recarga la página
      </Typography>
    </Container>
  );
};

export default PersonalFormIntro;
