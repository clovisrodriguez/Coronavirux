import React from 'react';
import { FormControlLabel, Button, FormGroup, Checkbox, Typography } from '@material-ui/core';
import epidemiologicalCriteria from '../../../constants/epidemiological-criteria';


const EpdCriteriaForm = ({
  epdCriteria,
  setEpdCriteria,
  onNext,
}) => {

  const handleCriteriaChange = input => e => {
    const criteria = {...epdCriteria};
    criteria[input] = !epdCriteria[input];
    setEpdCriteria(criteria);
  }

  return (
    <form autoComplete="off">
      <FormGroup>
        {
          Object.entries(epidemiologicalCriteria).map(([key, value]) => (
            <div key={`container-${key}`}>
              <FormControlLabel
                key={`control-${key}`}
                control={<Checkbox key={key} value={epdCriteria[key]} checked={epdCriteria[key]} onChange={handleCriteriaChange(key)} name={key} />}
                label={value.title}
              />
              <Typography key={`description-${key}`}>{value.description}</Typography>
            </div>
          ))
        }
      </FormGroup>
      <Button fullWidth margin="normal" variant="contained" color="primary" type="submit" onClick={onNext}>
        Next
      </Button>
    </form>
  );
};

export default EpdCriteriaForm;