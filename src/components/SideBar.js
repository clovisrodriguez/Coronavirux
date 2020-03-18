import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';

export default function SideBar({ cities = [] }) {
  const [activeData, setActiveData] = useState(cities);
  const [totalCases, setTotalCases] = useState(0);

  const calculateCases = () => {
    const totalCases = activeData.reduce((total, value) => {
      return value.cases + total;
    }, 0);

    setTotalCases(totalCases);
  };

  useEffect(() => {
    setActiveData(cities);
  }, [cities]);

  useEffect(() => {
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
        onChange={(event, value) =>
          value ? setActiveData([value]) : setActiveData(cities)
        }
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
