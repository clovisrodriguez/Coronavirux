import React from 'react';
import { Container, Typography } from '@material-ui/core';
import riskGroups from '../../../constants/risk-groups';
import epidemiologicalCriteria from '../../../constants/epidemiological-criteria';
import fullAgeSeverities from '../../../constants/fa-severities';
import symthomsCriteria from '../../../constants/synthoms-criteria';
import minorAgeSeverities from '../../../constants/ma-severities.';

const Summary = ({
  department,
  city,
  age,
  gender,
  riskGroup,
  epdCriteria,
  severity,
  symthoms,
}) => {
  const showRiskGroups = () =>
    Object.entries(riskGroups).map(([key, value]) => (
      <Typography key={key}><strong>{value}</strong> {riskGroup[key] ? 'Si' : 'No'}</Typography>
    ));
  const showEpdCriteria = () =>
    Object.entries(epidemiologicalCriteria).map(([key, value]) => (
      <Typography key={key}><strong>{value.title}</strong> {epdCriteria[key] ? 'Si' : 'No'}</Typography>
    ));
  const showSeverity = () => {
    if (age < 18) {
      return Object.entries(minorAgeSeverities).map(([key, value]) => (
        <Typography key={key}><strong>{value.title}</strong> {severity[key] ? 'Si' : 'No'}</Typography>
      ));
    }
    return Object.entries(fullAgeSeverities).map(([key, value]) => (
      <Typography key={key}><strong>{value.title}</strong> {severity[key] ? 'Si' : 'No'}</Typography>
    ));
  }
  const showSymthoms = () =>
    Object.entries(symthomsCriteria).map(([key, value]) => (
      <Typography key={key}><strong>{value.title}</strong> {symthoms[key] ? 'Si' : 'No'}</Typography>
    ));
  return (
    <Container>
      <Typography variant="h2">Resumen</Typography>
      <Typography variant="h4">Datos Generales</Typography>
      <Typography><strong>Departmento:</strong> {department}</Typography>
      <Typography><strong>Ciudad:</strong> {city}</Typography>
      <Typography><strong>Edad:</strong> {age}</Typography>
      <Typography><strong>Género:</strong> {gender}</Typography>
      <Typography variant="h4">Grupo de riesgo</Typography>
      {showRiskGroups()}
      <Typography variant="h4">Criterio Epidemiológico</Typography>
      {showEpdCriteria()}
      <Typography variant="h4">Criterio de Gravedad</Typography>
      {showSeverity()}
      <Typography variant="h4">Criterio Sintomático</Typography>
      {showSymthoms()}
    </Container>
  );
};

export default Summary;