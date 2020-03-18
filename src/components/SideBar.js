import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SideBar({ cities = [] }) {
  const [activeData, setActiveData] = useState(cities);
  const [totalCases, setTotalCases] = useState(0);

  const calculateCases = () => {
    console.log(activeData, cities);
    const totalCases = activeData.reduce((total, value) => {
      return value.cases + total;
    }, 0);

    setTotalCases(totalCases);
  };

  useEffect(() => {
    setActiveData(cities);
    calculateCases();
  });

  return (
    <div style={{ paddingTop: '20%', paddingLeft: '5%' }}>
      <Typography variant={'h5'}>Casos Confirmados</Typography>
      <Typography variant={'h6'}>{totalCases}</Typography>
      <Autocomplete
        id='buscador'
        options={cities}
        getOptionLabel={option => option.name}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            label='Resultados por ciudad'
            variant='outlined'
          />
        )}
      />
    </div>
  );
}
