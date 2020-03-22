import React, { useEffect } from 'react';
import { Typography, Container, Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const PersonalFormIntro = ({ location, setLocation, onNext }) => {
  useEffect(() => {
    console.log('im running')
    if (navigator.geolocation) {
      console.log('im running 2')
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })}
      );
    } else {
      setLocation({
        lat: 0.0,
        lng: 0.0
      });
    }
  }, [setLocation]);
  return (
    <Container maxWidth='xs'>
      <Typography align='center'>
        A continuación vamos a hacerte unas preguntas básicas para conocer un
        poco más sobre ti
      </Typography>
      <Button
        fullWidth
        variant='contained'
        color='secondary'
        onClick={onNext}
        disabled={!location}
      >
        Comencemos
      </Button>
      {!location && <LinearProgress />}
      <Typography align='center' variant='caption'>
        Porfavor habilita tu localización para iniciar el test, si tienes problemas para iniciar recarga la página
      </Typography>
    </Container>
  );
};

export default PersonalFormIntro;
