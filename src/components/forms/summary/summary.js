import React from 'react';
import { Container, Typography } from '@material-ui/core';

const Summary = ({
  department,
  city,
  age,
  gender,
}) => {
  return (
    <Container>
      <Typography variant="h3">Summary</Typography>
      <Typography><strong>Department:</strong> {department}</Typography>
      <Typography><strong>City:</strong> {city}</Typography>
      <Typography><strong>Age:</strong> {age}</Typography>
      <Typography><strong>Gender:</strong> {gender}</Typography>
    </Container>
  );
};

export default Summary;