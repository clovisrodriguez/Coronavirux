import React from 'react';
import {
  FormControlLabel,
  FormLabel,
  Button,
  FormGroup,
  Checkbox,
  Typography,
  Container
} from '@material-ui/core';
import minorAgeSeverities from '../../../constants/ma-severities.';

const SeverityMinorAgeForm = ({ severity, setSeverity, onNext }) => {
  const handleCriteriaChange = input => e => {
    const criteria = { ...severity };
    criteria[input] = !severity[input];
    setSeverity(criteria);
  };

  return (
    <Container maxWidth='sm'>
      <form autoComplete='off'>
        <FormLabel component='legend'>
          <Typography>
          ¿Cuáles de los siguientes criterios de gravedad aplica a tu caso?, en caso contrario, click en continuar.
          </Typography>
        </FormLabel>
        <FormGroup>
          {Object.entries(minorAgeSeverities).map(([key, value]) => (
            <div key={`container-${key}`}>
              <FormControlLabel
                key={`control-${key}`}
                control={
                  <Checkbox
                    key={key}
                    value={severity[key]}
                    checked={severity[key]}
                    onChange={handleCriteriaChange(key)}
                    name={key}
                  />
                }
                label={value.title}
              />
              <Typography key={`description-${key}`}>
                {value.description}
              </Typography>
            </div>
          ))}
        </FormGroup>
        <Button
          fullWidth
          margin='normal'
          variant='contained'
          color='primary'
          type='submit'
          onClick={onNext}
        >
          Continuar
        </Button>
      </form>
    </Container>
  );
};

export default SeverityMinorAgeForm;
