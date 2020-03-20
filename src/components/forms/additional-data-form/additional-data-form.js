import React from 'react';
import { TextField, FormLabel, FormControlLabel, RadioGroup, Radio, FormControl, Button } from '@material-ui/core';

const getGenders = () => ([
  'hombre',
  'mujer',
  'no binario',
  'prefiero no decirlo',
]);

const AdditionalDataForm = ({
  age,
  setAge,
  gender,
  setGender,
  onBack,
  onNext,
}) => {

  const handleAgeChange = e => {
    setAge(e.target.value);
  }

  const handleGenderChange = e => {
    setGender(e.target.value);
  }

  const handleAgeBlur = e => {
    const { value } = e.target;
    if (value < 1) {
      setAge(1);
    } else if (value > 100) {
      setAge(100);
    }
  };

  return (
    <form autoComplete="off">
      <TextField
        margin="normal"
        fullWidth
        label="Edad"
        type="number"
        onBlur={handleAgeBlur}
        onChange={handleAgeChange}
        value={age}
        inputProps={{
          min: 1,
          max: 100,
          type: 'number',
        }}
      />
      <FormControl margin="normal" fullWidth >
        <FormLabel component="legend">Género</FormLabel>
        <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
          {
            getGenders().map(g => (
              <FormControlLabel key={g} value={g} control={<Radio />} label={g} />
            ))
          }
        </RadioGroup>
      </FormControl>
      <Button fullWidth margin="normal" variant="contained" color="primary" type="submit" onClick={onNext}>
        Next
      </Button>
    </form>
  );
};

export default AdditionalDataForm;