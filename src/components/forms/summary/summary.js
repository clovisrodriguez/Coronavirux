import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import _ from 'lodash';
import fullAgeSeverities from '../../../constants/fa-severities';
import symthomsCriteria from '../../../constants/synthoms-criteria';
import minorAgeSeverities from '../../../constants/ma-severities.';
import tierTexts from '../../../constants/tier-texts';
import { createForm } from '../../../api';
import { makeStyles } from '@material-ui/core/styles';

const TIER_0 = 'TIER_0';
const TIER_1 = 'TIER_1';
const TIER_2 = 'TIER_2';
const TIER_3 = 'TIER_3';
const TIER_4 = 'TIER_4';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  paragraph: {
    margin: '1rem',
    wordBreak: 'break-word'
  }
}));

const Summary = ({
  department,
  city,
  phone,
  mail,
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
  const classes = useStyles();

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
      } else if (!epdScore && severityScore === 0 && symptomsScore >= 1) {
        setTier(TIER_1);
      } else {
        setTier(TIER_0);
      }

      const contentObject = tier => (
        <div>
          <Typography variant='h5'>{tierTexts[tier].text}</Typography>
          {tierTexts[tier].paragraph.map((text, key) => (
            <Typography className={classes.paragraph} variant='body1' key={key}>
              {text}
            </Typography>
          ))}
          {tierTexts[tier].emergencyLine.map((text, key) => (
            <Typography className={classes.paragraph} variant='body2' key={key}>
              {text}
            </Typography>
          ))}
        </div>
      );

      switch (tier) {
        case TIER_1:
          setContent(contentObject(TIER_1));
          break;
        case TIER_2:
          setContent(contentObject(TIER_2));
          break;
        case TIER_3:
          setContent(contentObject(TIER_3));
          break;
        case TIER_4:
          setContent(contentObject(TIER_4));
          break;
        default:
          setContent(contentObject(TIER_0));
      }
    };
    evaluatedForm();
    tier &&
      createForm({
        city,
        department,
        level: tier,
        location,
        age,
        gender,
        mail,
        phoneNumber: phone
      });
  }, [
    department,
    phone,
    mail,
    city,
    location,
    age,
    gender,
    riskGroup,
    epdCriteria,
    severity,
    symthoms,
    tier,
    classes
  ]);

  return (
    <Container className={classes.root}>
      <Typography variant='h2' className={classes.paragraph}>
        Resumen
      </Typography>
      {content}
    </Container>
  );
};

export default Summary;
