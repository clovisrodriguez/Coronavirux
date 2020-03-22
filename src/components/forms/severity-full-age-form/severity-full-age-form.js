import React from 'react';
import { FormControlLabel, Button, FormGroup, Checkbox, Typography } from '@material-ui/core';
import fullAgeSeverities from '../../../constants/fa-severities';


const SeverityFullAgeForm = ({
  severity,
  setSeverity,
  onNext,
}) => {

  const handleCriteriaChange = input => e => {
    const criteria = {...severity};
    criteria[input] = !severity[input];
    setSeverity(criteria);
  }

  return (
    <form autoComplete="off">
      <FormGroup>
        {
          Object.entries(fullAgeSeverities).map(([key, value]) => (
            <div key={`container-${key}`}>
              <FormControlLabel
                key={`control-${key}`}
                control={<Checkbox key={key} value={severity[key]} checked={severity[key]} onChange={handleCriteriaChange(key)} name={key} />}
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

export default SeverityFullAgeForm;