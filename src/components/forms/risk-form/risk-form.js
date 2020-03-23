import React from 'react';
import { FormLabel, FormControlLabel, Button, Typography, FormGroup, Checkbox, Container } from '@material-ui/core';
import riskGroups from '../../../constants/risk-groups';

const RiskForm = ({
  riskGroup,
  setRiskGroup,
  onNext,
}) => {

  const handleRiskGroupChange = input => e => {
    const risks = { ...riskGroup };
    risks[input] = !riskGroup[input];
    setRiskGroup(risks);
  }

  return (
    <Container maxWidth='sm'>
      <form autoComplete="off">
        <FormLabel component="legend">
          <Typography>
            Perteneces a algún grupo de riesgo, si no puedes continuar sin marcar ninguna casilla:
          </Typography>
        </FormLabel>
        <FormGroup>
          {
            Object.entries(riskGroups).map(([key, value]) => (
              <FormControlLabel
                key={`control-${key}`}
                control={<Checkbox key={key} value={riskGroup[key]} checked={riskGroup[key]} onChange={handleRiskGroupChange(key)} name={key} />}
                label={value}
              />
            ))
          }
        </FormGroup>
        <Button fullWidth margin="normal" variant="contained" color="primary" type="submit" onClick={onNext}>
          Continuar
      </Button>
      </form>
    </Container>
  );
};

export default RiskForm;