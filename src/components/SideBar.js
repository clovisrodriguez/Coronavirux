import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import {
  RadialBarChart,
  BarChart,
  Tooltip,
  ResponsiveContainer,
  Bar,
  RadialBar,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Legend,
  LineChart
} from 'recharts';
import Color from 'color';
import { Card } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  boxContainer: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    textAlign: 'center'
  }
}));

const calculateCasesPerParameter = (
  activeDataPatients,
  parameter,
  factor = 0.03
) => {
  let casesPerAgeObject = [];

  activeDataPatients.forEach(pacient => {
    const index = _.findIndex(
      casesPerAgeObject,
      obj => obj[parameter] === pacient[parameter]
    );

    if (index >= 0) {
      casesPerAgeObject[index].fill = Color(casesPerAgeObject[index].fill)
        .darken(factor)
        .hex();
      casesPerAgeObject[index].cases++;
    } else {
      const point = {
        cases: 1,
        fill: '#ffcdd2'
      };
      point[parameter] = pacient[parameter];
      casesPerAgeObject.push(point);
    }
  });

  return _.sortBy(casesPerAgeObject, `${parameter}`);
};

export default function SideBar({ cities = [], pacientCases }) {
  const classes = useStyles();
  const [activeData, setActiveData] = useState(cities);
  const [totalCases, setTotalCases] = useState(0);
  const [casesPerAge, setCasesPerAge] = useState([]);
  const [casesPerPlace, setCasesPerPlace] = useState([]);
  const [casesPerDate, setCasesPerDate] = useState([]);

  useEffect(() => {
    setActiveData(cities);
  }, [cities]);

  useEffect(() => {
    const calculateCases = () => {
      const totalCases = activeData.reduce((total, value) => {
        return value.cases + total;
      }, 0);

      const activeDataPatients =
        activeData.length === 1
          ? _.filter(
              pacientCases,
              pacient => activeData[0].name === pacient.city
            )
          : pacientCases;

      setTotalCases(totalCases);
      setCasesPerDate(
        calculateCasesPerParameter(activeDataPatients, 'date', 0.001)
      );
      setCasesPerPlace(
        calculateCasesPerParameter(activeDataPatients, 'place', 0.01)
      );
      setCasesPerAge(calculateCasesPerParameter(activeDataPatients, 'age'));
    };

    calculateCases();
  }, [activeData, pacientCases]);

  return (
    <div className={classes.root}>
      <div className={classes.boxContainer}>
        <Typography variant={'h5'}>Casos Confirmados</Typography>
        <Typography variant={'h6'}>{totalCases}</Typography>
      </div>
      <Divider variant='middle' />
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
      <div className={classes.boxContainer}>
        <Typography variant={'h6'}>Casos por edad</Typography>
        <ResponsiveContainer width='100%' height={200}>
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
                      {_.get(payload[0], 'payload.age', 'none') + ' Años'}
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
      <div className={classes.boxContainer} style={{ marginTop: '-6rem' }}>
        <Typography variant={'h6'}>Lugar de Atención</Typography>
        <div style={{ height: '1rem' }}></div>
        <ResponsiveContainer width='100%' height={160}>
          <BarChart data={casesPerPlace}>
            <XAxis dataKey='place' />
            <YAxis />
            <Tooltip
              content={({ payload }) => (
                <CustomToolTip {...{ payload, prop: 'place', word: '' }} />
              )}
            />
            <Bar dataKey='cases' />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={classes.boxContainer}>
        <Typography variant={'h6'}>Fecha del Contagio</Typography>
        <div style={{ height: '1rem' }}></div>
        <ResponsiveContainer width={300} height={160}>
          <LineChart data={casesPerDate}>
            <CartesianGrid strokeDasharray='1 1' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip
              content={({ payload }) => (
                <CustomToolTip {...{ payload, prop: 'date', word: '' }} />
              )}
            />
            <Line type='monotone' dataKey='cases' stroke='#e53935' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomToolTip = ({ payload, prop, word }) => {
  return (
    <Card style={{ padding: '1rem' }}>
      <Typography variant='caption'>
        {_.get(payload[0], 'payload.' + prop, 'none') + ` ${word}`}
      </Typography>
      <Typography variant='body1'>
        {_.get(payload[0], 'value', 0) + ' Casos'}
      </Typography>
    </Card>
  );
};
