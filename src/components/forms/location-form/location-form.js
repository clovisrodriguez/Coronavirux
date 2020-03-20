import React, { useState } from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getDepartments, getCitiesByDepartment } from '../../../services/regionService';


const LocationForm = ({
  city, setCity,
  department, setDepartment,
  onNext,
}) => {

  const [cities, setCities] = useState([]);

  const handleDepartmentChange = (event, value) => {
    setDepartment(value);
    setCity('');
    if (!value) {
      setCities([]);
    }
    setCities(getCitiesByDepartment(value));
  };

  const handleCityChange = (event, value) => {
    setCity(value);
  };

  return (
    <form autoComplete="off">
      <Typography component="p" variant="h4">Dónde vives?</Typography>
      <Autocomplete
        options={getDepartments()}
        getOptionLabel={option => option}
        onChange={handleDepartmentChange}
        value={department}
        renderInput={params =>
          <TextField {...params} label="Departamento" margin="normal" required/>
        }
      />
      <Autocomplete
        options={cities}
        getOptionLabel={option => option}
        onChange={handleCityChange}
        value={city}
        renderInput={params =>
          <TextField {...params} label="Ciudad" margin="normal" required/>
        }
      />
      <Button fullWidth variant="contained" color="primary" onClick={onNext} disabled={!department || !city}>Next</Button>
    </form>
  );
};

export default LocationForm;