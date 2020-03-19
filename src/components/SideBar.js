import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import {
  RadialBarChart,
  Tooltip,
  ResponsiveContainer,
  RadialBar
} from 'recharts';
import Color from 'color';
import { Card } from '@material-ui/core';

export default function SideBar({ cities = [], pacientCases }) {
  const [activeData, setActiveData] = useState(cities);
  const [totalCases, setTotalCases] = useState(0);
  const [casesPerAge, setCasesPerAge] = useState([]);

  useEffect(() => {
    setActiveData(cities);
  }, [cities]);

  useEffect(() => {
    const calculateCases = () => {
      const totalCases = activeData.reduce((total, value) => {
        return value.cases + total;
      }, 0);

      let casesPerAgeObject = [];

      const dataAge =
        activeData.length === 1
          ? _.filter(
              pacientCases,
              pacient => activeData[0].name === pacient.city
            )
          : pacientCases;

      dataAge.forEach(pacient => {
        const index = _.findIndex(
          casesPerAgeObject,
          obj => obj.range === pacient.age
        );

        if (index >= 0) {
          casesPerAgeObject[index].fill = Color(casesPerAgeObject[index].fill)
            .darken(0.03)
            .hex();
          casesPerAgeObject[index].cases++;
        } else {
          casesPerAgeObject.push({
            range: pacient.age,
            cases: 1,
            fill: '#ffcdd2'
          });
        }
      });

      setTotalCases(totalCases);
      setCasesPerAge(_.sortBy(casesPerAgeObject, 'range'));
    };
    calculateCases();
  }, [activeData, pacientCases]);

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
      <ResponsiveContainer width={300} height={300}>
        <RadialBarChart
          dataKey='cases'
          data={casesPerAge}
          innerRadius='10%'
          outerRadius='80%'
          startAngle={180}
          endAngle={0}
        >
          <Tooltip
            content={({ payload }) => {
              return (
                <Card style={{ padding: '1rem' }}>
                  <Typography variant='caption'>
                    {_.get(payload[0], 'payload.range', 'none') + ' Años'}
                  </Typography>
                  <Typography variant='body1'>
                    {_.get(payload[0], 'value', 0) + ' Casos'}
                  </Typography>
                </Card>
              );
            }}
          />
          <RadialBar
            minAngle={15}
            background
            clockWise={true}
            dataKey='cases'
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
