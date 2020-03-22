import React from 'react';
import { Typography, Container, Button } from '@material-ui/core';

const EpidemiologicalCriteriaIntro = ({
  onNext,
}) => {
  return (
    <Container maxWidth="xs">
      <Typography align="center" paragraph>A continuación analizaremos algunos criterios empidemiológicos</Typography>
      <Button fullWidth variant="contained" color="secondary" onClick={onNext}>Continuar</Button>
    </Container>
  );
};

export default EpidemiologicalCriteriaIntro;