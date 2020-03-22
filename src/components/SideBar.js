import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import {
  BarChart,
  Tooltip,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  LineChart
} from 'recharts';
import Color from 'color';
import { Card } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '3rem',
    overflowY: 'scroll',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '70vh'
  },
  boxContainer: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    textAlign: 'center'
  },
  pointCardContainer: {
    display: 'flex'
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
  const [casesPerOriginKind, setCasesPerOriginKind] = useState([]);

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
      setCasesPerOriginKind(
        calculateCasesPerParameter(activeDataPatients, 'originKind')
      );
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
        <Typography
          variant={'h6'}
          style={{ fontWeigth: 900, color: '#e53935', fontSize: '2rem' }}
        >
          {totalCases}
        </Typography>
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
      <Typography variant={'h6'}>Lugar de Atención</Typography>
      <div className={`${classes.boxContainer} ${classes.pointCardContainer}`}>
        {casesPerPlace.map((place, index) => (
          <DataCard {...{ title: place.place, total: place.cases }} key={index} />
        ))}
      </div>
      <Typography variant={'h6'}>Origen del caso</Typography>
      <div className={`${classes.boxContainer} ${classes.pointCardContainer}`}>
        {casesPerOriginKind.map((kind, index) => (
          <DataCard {...{ title: kind.originKind, total: kind.cases }} key={index} />
        ))}
      </div>
      <div className={classes.boxContainer}>
        <Typography variant={'h6'}>Casos por Edad</Typography>
        <div style={{ height: '1rem' }}></div>
        <ResponsiveContainer width={300} height={160}>
          <BarChart data={casesPerAge}>
            <XAxis dataKey='age' />
            <YAxis />
            <Tooltip
              content={({ payload }) => (
                <CustomToolTip {...{ payload, prop: 'age', word: 'años' }} />
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

const DataCard = ({ title, total }) => {
  return (
    <div style={{ padding: '1rem', minWidth: '100px', flex: 1 }}>
      <Typography variant={'h5'} style={{ fontSize: '1rem' }}>
        {title}
      </Typography>
      <Typography
        variant={'h6'}
        style={{ fontWeigth: 800, color: '#e53935', fontSize: '1.7rem' }}
      >
        {total}
      </Typography>
    </div>
  );
};

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
