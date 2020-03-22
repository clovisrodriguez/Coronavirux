/* eslint-disable no-multi-str */
const minorAgeSeverities = {
  retraction: {
    title: 'Retracciones intercostales, subcostales, supraclaviculares',
    description: '(Esto significa que se hunde la piel entre las costillas, debajo de las costillas, arriba de las clavículas)',
    value: 1
  },
  nasalFlaring: {
    title: 'Aleteo nasal',
    description: '',
    value: 1
  },
  irritability: {
    title: 'Irritabilidad(en niños)',
    description: '',
    value: 1
  },
  thoracoabdominal: {
    title: 'Disyunción toracoabdominal',
    description: '',
    value: 1
  },
  breathing: {
    title: 'Respiración rápida',
    description: '• Para bebés de hasta un mes de vida, más de 60 respiraciones por minuto\n\
      • Para niños de hasta 2 años, más de 50 respiraciones por minuto\n\
      • Para niños de hasta 5 años, más de 40 respiraciones por minuto\n\
      • Para niños mayores de 5 años, más de 30 respiraciones por minuto',
    value: 1
  },
  consciousness: {
    title: 'Alteración del estado de la conciencia',
    description: '(esto ocurre cuando a la persona le es muy difícil despertar y al hacerlo, se siente muy confundida y por ejemplo, no saben donde están).',
    value: 1
  },
  dehydration: {
    title: 'Deshidratación',
    description: '',
    value: 1
  },
};

export default minorAgeSeverities;
