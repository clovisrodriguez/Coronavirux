import React, { lazy, useState, Suspense } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import riskGroups from '../../constants/risk-groups';
import epidemiologicalCriteria from '../../constants/epidemiological-criteria';
import fullAgeSeverities from '../../constants/fa-severities';
import symthomsCriteria from '../../constants/synthoms-criteria';
import SeverityMinorAgeForm from '../../components/forms/severity-minor-age-form';
import minorAgeSeverities from '../../constants/ma-severities.';

const PersonalFormIntro = lazy(() =>
  import('../../components/intros/personal-form-intro')
);
const LocationForm = lazy(() => import('../../components/forms/location-form'));
const AdditionalDataForm = lazy(() =>
  import('../../components/forms/additional-data-form')
);
const RiskForm = lazy(() => import('../../components/forms/risk-form'));
const Summary = lazy(() => import('../../components/forms/summary'));
const EpidemiologicalCriteriaIntro = lazy(() =>
  import('../../components/intros/epidemiological-criteria-intro')
);
const EpdCriteriaForm = lazy(() =>
  import('../../components/forms/epd-criteria-form')
);
const SeverityFullAgeForm = lazy(() =>
  import('../../components/forms/severity-full-age-form')
);
const SymthomsForm = lazy(() =>
  import('../../components/forms/symthoms-form/symthoms-form')
);

const Form = () => {
  const { container } = useStyles();
  const [location, setLocation] = useState(null);
  const [step, setStep] = useState(0);
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('hombre');
  const [age, setAge] = useState(20);
  const [department, setDepartment] = useState('');
  const [riskGroup, setRiskGroup] = useState(
    Object.entries(riskGroups).reduce((acc, [key]) => {
      acc[key] = false;
      return acc;
    }, {})
  );
  const [epdCriteria, setEpdCriteria] = useState(
    Object.entries(epidemiologicalCriteria).reduce((acc, [key]) => {
      acc[key] = false;
      return acc;
    }, {})
  );
  const [faSeverity, setFASeverity] = useState(
    Object.entries(fullAgeSeverities).reduce((acc, [key]) => {
      acc[key] = false;
      return acc;
    }, {})
  );
  const [maSeverity, setMASeverity] = useState(
    Object.entries(minorAgeSeverities).reduce((acc, [key]) => {
      acc[key] = false;
      return acc;
    }, {})
  );
  const [symthoms, setSymthoms] = useState(
    Object.entries(symthomsCriteria).reduce((acc, [key]) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  const isMinorAge = age => age < 18;
  const isMainStep = step => step < 6;
  const getForm = step => {
    const mainSteps = {
      0: () => (
        <PersonalFormIntro
          onNext={nextStep}
          location={location}
          setLocation={setLocation}
        />
      ),
      1: () => (
        <LocationForm
          city={city}
          setCity={setCity}
          department={department}
          setDepartment={setDepartment}
          onNext={nextStep}
        />
      ),
      2: () => (
        <AdditionalDataForm
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          onNext={nextStep}
        />
      ),
      3: () => (
        <RiskForm
          riskGroup={riskGroup}
          setRiskGroup={setRiskGroup}
          onNext={nextStep}
        />
      ),
      4: () => <EpidemiologicalCriteriaIntro onNext={nextStep} />,
      5: () => (
        <EpdCriteriaForm
          epdCriteria={epdCriteria}
          setEpdCriteria={setEpdCriteria}
          onNext={nextStep}
        />
      )
    };
    const fullAgeSteps = {
      6: () => (
        <SeverityFullAgeForm
          severity={faSeverity}
          setSeverity={setFASeverity}
          onNext={nextStep}
        />
      ),
      7: () => (
        <SymthomsForm
          symthoms={symthoms}
          setSymthoms={setSymthoms}
          onNext={nextStep}
        />
      ),
      8: () => (
        <Summary
          department={department}
          city={city}
          age={age}
          gender={gender}
          riskGroup={riskGroup}
          epdCriteria={epdCriteria}
          severity={faSeverity}
          symthoms={symthoms}
          location={location}
        />
      )
    };
    const minorAgeSteps = {
      6: () => (
        <SeverityMinorAgeForm
          severity={maSeverity}
          setSeverity={setMASeverity}
          onNext={nextStep}
        />
      ),
      7: () => (
        <SymthomsForm
          symthoms={symthoms}
          setSymthoms={setSymthoms}
          onNext={nextStep}
        />
      ),
      8: () => (
        <Summary
          {...{
            department,
            city,
            location,
            age,
            gender,
            riskGroup,
            epdCriteria,
            maSeverity,
            symthoms
          }}
        />
      )
    };
    if (isMainStep(step)) return mainSteps[step]();
    if (isMinorAge(age)) return minorAgeSteps[step]();
    return fullAgeSteps[step]();
  };

  const nextStep = e => {
    e.preventDefault();
    setStep(step + 1);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6'>Reconocimiento</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='sm' className={container}>
        <Suspense fallback={<CircularProgress />}>{getForm(step)}</Suspense>
      </Container>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: '1rem'
  }
}));

export default Form;
