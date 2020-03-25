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
import epidemiologicalCriteria from '../../../constants/epidemiological-criteria';

const EpdCriteriaForm = ({ epdCriteria, setEpdCriteria, onNext }) => {
  const handleCriteriaChange = input => e => {
    const criteria = { ...epdCriteria };
    criteria[input] = !epdCriteria[input];
    setEpdCriteria(criteria);
  };

  return (
    <Container maxWidth='sm'>
      <form autoComplete='off'>
        <FormLabel component='legend'>
          <Typography>
            Marca si perteneces a alguno de los siguientes grupos de riesgo, en
            caso contrario, da click en continuar:
          </Typography>
        </FormLabel>
        <FormGroup>
          {Object.entries(epidemiologicalCriteria).map(([key, value]) => (
            <div key={`container-${key}`}>
              <FormControlLabel
                key={`control-${key}`}
                control={
                  <Checkbox
                    key={key}
                    value={epdCriteria[key]}
                    checked={epdCriteria[key]}
                    onChange={handleCriteriaChange(key)}
                    name={key}
                  />
                }
                label={value.title}
              />
              <Typography key={`description-${key}`} paragraph>
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

export default EpdCriteriaForm;
