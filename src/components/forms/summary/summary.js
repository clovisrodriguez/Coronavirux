import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import _ from 'lodash';
import fullAgeSeverities from '../../../constants/fa-severities';
import symthomsCriteria from '../../../constants/synthoms-criteria';
import minorAgeSeverities from '../../../constants/ma-severities.';
import { createForm } from '../../../api';

const TIER_1 = 'TIER_1';
const TIER_2 = 'TIER_2';
const TIER_3 = 'TIER_3';
const TIER_4 = 'TIER_4';

const Summary = ({
  department,
  city,
  age,
  gender,
  riskGroup,
  location,
  epdCriteria,
  severity,
  symthoms
}) => {
  const [tier, setTier] = useState(null);
  const [content, setContent] = useState(<div>resultados no disponibles</div>);

  const calculateOneTrueCriteria = criteriaList =>
    _.find(criteriaList, criteria => criteria) || false;

  const calculatePerParameter = (parameterConstants, answers) => {
    return _.reduce(
      Object.entries(parameterConstants).map(([key, value]) => {
        if (answers[key]) return value.value;
        return 0;
      }),
      (sum, n) => sum + n,
      0
    );
  };

  useEffect(() => {
    const evaluatedForm = () => {
      const epdScore = calculateOneTrueCriteria(epdCriteria);
      const riskScore = calculateOneTrueCriteria(riskGroup);
      const severityScore =
        age >= 18
          ? calculatePerParameter(fullAgeSeverities, severity)
          : calculatePerParameter(minorAgeSeverities, severity);
      const symptomsScore = calculatePerParameter(symthomsCriteria, symthoms);

      if (epdScore && severityScore >= 2 && symptomsScore >= 2) {
        riskScore ? setTier(TIER_4) : setTier(TIER_3);
      } else if (severityScore >= 1 && symptomsScore >= 1) {
        setTier(TIER_2);
      } else {
        setTier(TIER_1);
      }

      switch (tier) {
        case TIER_1:
          setContent(
            <Typography variant='h5'>
              BAJA PROBABILIDAD DE ESTAR CONTAGIADO CON COVID-19, ES MAS
              PROBABLE QUE TENGA UNA ENFERMEDAD RESPIRATORIA LEVE, REQUIERE
              CUIDADO EN CASA.
            </Typography>
          );
          break;
        case TIER_2:
          setContent(
            <Typography variant='h5'>
              ES PROBABLE QUE ESTE CONTAGIADO CON COVID-19 Y DEBE COMUNICARSE
              CON SU EMPRESA PRESTADORA DE SERVICIOS.
            </Typography>
          );
          break;
        case TIER_3:
          setContent(
            <Typography variant='h5'>
              ES PROBABLE QUE ESTE CONTAGIADO CON COVID-19 Y DEBE IR A UN
              HOSPITAL.
            </Typography>
          );
          break;
        default:
          setContent(
            <Typography variant='h5'>
              ES PROBABLE QUE ESTE CONTAGIADO CON COVID-19 Y DEBE IR A UN
              HOSPITAL, PERTENECE A UN GRUPO DE RIESGO QUE PUEDE EMPEORAR SU
              CONDICIÓN.
            </Typography>
          );
      }
    };
    evaluatedForm();
    tier && createForm({ city, department, level: tier, location, age, gender });
  }, [
    department,
    city,
    location,
    age,
    gender,
    riskGroup,
    epdCriteria,
    severity,
    symthoms,
    tier
  ]);

  return (
    <Container>
      <Typography variant='h2'>Resumen</Typography>
      {content}
    </Container>
  );
};

export default Summary;
