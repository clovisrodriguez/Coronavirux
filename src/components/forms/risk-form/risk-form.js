import React from 'react';
import { FormLabel, FormControlLabel, RadioGroup, Radio, FormControl, Button, Typography } from '@material-ui/core';

const RiskForm = ({
  riskGroup,
  setRiskGroup,
  onNext,
}) => {


  const handleRiskGroupChange = e => {
    setRiskGroup(e.target.value === 'true' ? true : false)
  }

  return (
    <form autoComplete="off">
      <FormControl margin="normal">
        <FormLabel component="legend">
          <Typography>
            Perteneces a algún grupo de riesgo 60 años, hipertensión, diabetes, cardiopatías, patología pulmonar, enfermedad renal crónica, inmunosupresión, patología hepática, neoplasias activas
          </Typography>
        </FormLabel>
        <RadioGroup aria-label="riskGroup" name="risk-group" value={riskGroup} onChange={handleRiskGroupChange}>
          <FormControlLabel value={true} control={<Radio />} label="Si" checked={riskGroup} />
          <FormControlLabel value={false} control={<Radio />} label="No" checked={!riskGroup} />
        </RadioGroup>
      </FormControl>
      <Button fullWidth margin="normal" variant="contained" color="primary" type="submit" onClick={onNext}>
        Next
      </Button>
    </form>
  );
};

export default RiskForm;