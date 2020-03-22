import React from 'react';
import { Typography, Container, Button, makeStyles } from '@material-ui/core';
import doctorImage from '../../../img/doctor1.svg';

const SymthomsIntro = ({
  onNext,
}) => {
  const {
    doctor,
  } = useStyles();
  return (
    <Container maxWidth="xs">
      <img alt="doctor" src={doctorImage} className={doctor} />
      <Typography align="center" paragraph>Veamos tus síntomas!</Typography>
      <Button fullWidth variant="contained" color="secondary" onClick={onNext}>Continuar</Button>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  doctor: {
    width: '100%',
  }
}));

export default SymthomsIntro;