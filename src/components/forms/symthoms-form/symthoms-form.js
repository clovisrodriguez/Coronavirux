import React from 'react';
import { FormControlLabel, Button, FormGroup, FormLabel, Checkbox, Typography } from '@material-ui/core';
import symthomsCriteria from '../../../constants/synthoms-criteria';


const SymthomsForm = ({
  symthoms,
  setSymthoms,
  onNext,
}) => {

  const handleCriteriaChange = input => e => {
    const criteria = {...symthoms};
    criteria[input] = !symthoms[input];
    setSymthoms(criteria);
  }

  return (
    <form autoComplete="off">
      <FormLabel component='legend'>
          <Typography>
            ¿Cuáles de los siguientes criterios de gravedad aplica a tu caso?,
            en caso contrario, click en continuar.
          </Typography>
        </FormLabel>
      <FormGroup>
        {
          Object.entries(symthomsCriteria).map(([key, value]) => (
            <div key={`container-${key}`}>
              <FormControlLabel
                key={`control-${key}`}
                control={<Checkbox key={key} value={symthoms[key]} checked={symthoms[key]} onChange={handleCriteriaChange(key)} name={key} />}
                label={value.title}
              />
              <Typography key={`description-${key}`}>{value.description}</Typography>
            </div>
          ))
        }
      </FormGroup>
      <Button fullWidth margin="normal" variant="contained" color="primary" type="submit" onClick={onNext}>
        Continuar
      </Button>
    </form>
  );
};

export default SymthomsForm;