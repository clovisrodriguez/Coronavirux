const fullAgeSeverities = {
  dyspnoea: {
    title: 'Disnea',
    description: '(sensación de estarse ahogando)',
    value: 2,
  },
  blueColor: {
    title: 'Coloración azul en labios y nariz',
    description: '',
    value: 1,
  },
  expectoration: {
    title: 'Expectoración (toser) con sangre',
    description: '',
    value: 1,
  },
  retraction: {
    title: 'Retracciones intercostales, subcostales, supraclaviculares',
    description: '(Esto significa que se hunde la piel entre las costillas, debajo de las costillas, arriba de las clavículas)',
    value: 1
  },
  breathing: {
    title: 'Respiración rápida de más de 30 respiraciones por minuto',
    description: '',
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

export default fullAgeSeverities;
