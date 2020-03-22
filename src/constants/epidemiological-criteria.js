const epidemiologicalCriteria = {
  travel: {
    title: '¿Has viajado a algún país con epidemia de Covid-19 en los últimos 14 días?',
    description: '(China, Irán, Ecuador, Europa)',
  },
  contact: {
    title: '¿Has estado en contacto cercano con una persona confirmada con Covid-19 o con contagio probable? ',
    description: '(Contacto entre personas en un espacio de 2 metros o menos, en una habitación o área de atención).\nUn caso confirmado es el de aquella persona con prueba en sangre positiva para Covid-19.',
  },
  medical: {
    title: '¿Eres un trabajador de la salud en contacto con una persona confirmada con Covid-19 o con contagio probable?',
    description: '',
  },
};

export default epidemiologicalCriteria;
