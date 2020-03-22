import React, { lazy, useState, Suspense } from 'react';
import {
  CssBaseline,
  Container,
  makeStyles,
  CircularProgress,
  Paper
} from '@material-ui/core';
import ReactGA from 'react-ga';
import SymthomsIntro from '../../components/intros/symthoms-intro/symthoms-intro';
import { initRiksGroup, initEdp, initFASeverity, initMASeverity, initSymthoms } from '../../helpers/initLocalStates';
import Navbar from '../../components/navbar';


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
const SeverityMinorAgeForm = lazy(() =>
  import('../../components/forms/severity-minor-age-form')
);
const SymthomsForm = lazy(() =>
  import('../../components/forms/symthoms-form/symthoms-form')
);

const Form = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
  const { container, paper } = useStyles();
  const [location, setLocation] = useState(null);
  const [step, setStep] = useState(0);
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('hombre');
  const [age, setAge] = useState(18);
  const [department, setDepartment] = useState('');
  const [riskGroup, setRiskGroup] = useState(initRiksGroup);
  const [epdCriteria, setEpdCriteria] = useState(initEdp);
  const [faSeverity, setFASeverity] = useState(initFASeverity);
  const [maSeverity, setMASeverity] = useState(initMASeverity);
  const [symthoms, setSymthoms] = useState(initSymthoms);

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
        <SymthomsIntro
          onNext={nextStep}
        />),
      8: () => (
        <SymthomsForm
          symthoms={symthoms}
          setSymthoms={setSymthoms}
          onNext={nextStep}
        />
      ),
      9: () => (
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
        <SymthomsIntro
          onNext={nextStep}
        />),
      8: () => (
        <SymthomsForm
          symthoms={symthoms}
          setSymthoms={setSymthoms}
          onNext={nextStep}
        />
      ),
      9: () => (
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
      <Navbar />
      <Container maxWidth='sm' className={container}>
        <Paper elevation={3} className={paper}>
          <Suspense fallback={<CircularProgress />}>{getForm(step)}</Suspense>
        </Paper>
      </Container>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: '1rem',
  },
  paper: {
    padding: '2rem 2rem 1rem 2rem ',
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default Form;
