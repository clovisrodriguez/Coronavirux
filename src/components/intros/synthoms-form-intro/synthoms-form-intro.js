import React from 'react';
import { Typography, Container, Button } from '@material-ui/core';

const SynthomsFormIntro = ({
  onNext,
}) => {
  return (
    <Container maxWidth="xs">
      <Typography align="center">A continuación analizaremos tus síntomas</Typography>
      <Button fullWidth variant="contained" color="secondary" onClick={onNext}>Continuar</Button>
    </Container>
  );
};

export default SynthomsFormIntro;