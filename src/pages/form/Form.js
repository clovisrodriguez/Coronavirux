import React, { useState, Suspense } from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Container, makeStyles, CircularProgress } from '@material-ui/core';

const PersonalFormIntro = React.lazy(() => import('../../components/intros/personal-form-intro/personal-form-intro'));
const LocationForm = React.lazy(() => import('../../components/forms/location-form/location-form'));
const AdditionalDataForm = React.lazy(() => import('../../components/forms/additional-data-form/additional-data-form'));
const RiskForm = React.lazy(() => import('../../components/forms/risk-form/risk-form'));
const SynthomsFormIntro = React.lazy(() => import('../../components/intros/synthoms-form-intro/synthoms-form-intro'));
const Summary = React.lazy(() => import('../../components/forms/summary/summary'));

const Form = () => {
  const { container } = useStyles();
  const [step, setStep] = useState(0);
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('hombre');
  const [age, setAge] = useState(20);
  const [department, setDepartment] = useState('');
  const [riskGroup, setRiskGroup] = useState(false);

  const getForm = (step) => {
    const steps = {
      0: () => (<PersonalFormIntro
        onNext={nextStep}
      />),
      1: () => (<LocationForm
        city={city}
        setCity={setCity}
        department={department}
        setDepartment={setDepartment}
        onNext={nextStep}
      />),
      2: () => (<AdditionalDataForm 
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        onNext={nextStep}
      />),
      3: () => (<RiskForm
        riskGroup={riskGroup}
        setRiskGroup={setRiskGroup}
        onNext={nextStep}
      />),
      4: () => (<SynthomsFormIntro
        onNext={nextStep}
      />),
      5: () => (<Summary
        department={department}
        city={city}
        age={age}
        gender={gender}
      />),
    }
    return steps[step]();
  };

  const nextStep = e => {
    e.preventDefault();
    setStep(step + 1);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">
            Reconocimiento
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" className={container}>
        <Suspense fallback={<CircularProgress />}>
          {getForm(step)}
        </Suspense>
      </Container>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: '1rem',
  },
}));

export default Form;