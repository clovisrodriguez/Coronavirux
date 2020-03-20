import React from 'react';
import { Typography, Container, Button } from '@material-ui/core';

const PersonalFormIntro = ({
  onNext,
}) => {
  return (
    <Container maxWidth="xs">
      <Typography align="center">A continuación vamos a hacerte unas preguntas básicas para conocer un poco más sobre ti</Typography>
      <Button fullWidth variant="contained" color="secondary" onClick={onNext}>Comencemos</Button>
    </Container>
  );
};

export default PersonalFormIntro;