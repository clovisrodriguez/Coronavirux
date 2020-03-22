const symthomsCriteria = {
  fiver: {
    title: 'Fiebre superior a 38°C',
    description: '',
    value: 2,
  },
  cough: {
    title: 'Tos seca',
    description: '',
    value: 1,
  },
  soreThroat: {
    title: 'Dolor de garganta',
    description: '',
    value: 1,
  },
  fatigue: {
    title: 'Fatiga',
    description: '(Esto significa que se hunde la piel entre las costillas, debajo de las costillas, arriba de las clavículas)',
    value: 1
  },
  gastrointestinal: {
    title: 'Síntomas gastrointestinales',
    description: '(diarrea liquida O vómito)',
    value: 1
  },
  congestion: {
    title: 'Congestión nasal',
    description: '',
    value: 1
  },
  phlegm: {
    title: 'Flema',
    description: '',
    value: 1
  },
};

export default symthomsCriteria;
