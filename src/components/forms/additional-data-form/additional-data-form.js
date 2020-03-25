import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  Button
} from '@material-ui/core';
import genders from '../../../constants/genders';

const AdditionalDataForm = ({
  age,
  setAge,
  gender,
  setGender,
  phone,
  setPhone,
  mail,
  setMail,
  onNext
}) => {
  const handleAgeChange = e => setAge(e.target.value);
  const handleGenderChange = e => setGender(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);
  const handleMailChange = e => setMail(e.target.value);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (age && mail && phone) {
      setDisabled(false);
    }
  }, [age, mail, phone]);

  const handleAgeBlur = e => {
    const { value } = e.target;
    if (value < 1) {
      setAge(1);
    } else if (value > 100) {
      setAge(100);
    }
  };

  return (
    <form autoComplete='off'>
      <TextField
        margin='normal'
        fullWidth
        label='Teléfono / Celular'
        type='tel'
        onChange={handlePhoneChange}
        value={phone}
        required
      />
      <TextField
        margin='normal'
        fullWidth
        label='Correo'
        type='email'
        onChange={handleMailChange}
        value={mail}
        required
      />
      <TextField
        margin='normal'
        fullWidth
        label='Edad'
        type='number'
        onBlur={handleAgeBlur}
        onChange={handleAgeChange}
        value={age}
        inputProps={{
          min: 1,
          max: 100,
          type: 'number'
        }}
        required
      />
      <FormControl margin='normal' fullWidth>
        <FormLabel component='legend'>Género</FormLabel>
        <RadioGroup
          aria-label='gender'
          name='gender'
          value={gender}
          onChange={handleGenderChange}
        >
          {genders.map(g => (
            <FormControlLabel key={g} value={g} control={<Radio />} label={g} />
          ))}
        </RadioGroup>
      </FormControl>
      <Button
        fullWidth
        margin='normal'
        variant='contained'
        color='primary'
        type='submit'
        onClick={onNext}
        disabled={disabled}
      >
        Continuar
      </Button>
    </form>
  );
};

export default AdditionalDataForm;
