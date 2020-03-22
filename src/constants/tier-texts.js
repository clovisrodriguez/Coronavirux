/* eslint-disable no-multi-str */
const tierTexts = {
  TIER_3: {
    text:
      'ES PROBABLE QUE ESTE CONTAGIADO CON COVID-19 Y DEBE LLAMAR A LA LINEA DE ATENCION MEDICA DE URGENCIA Y EN CUANTO SE LE INDIQUE, IR AL HOSPITAL CORRESPONDIENTE.',
    paragraph: ['Comunicate de inmediato a la Línea de Atención COVID-19:'],
    emergencyLine: [
      'Bogotá: +57 (1) 330 5041',
      'Resto del país: 01 8000 955 590',
      'Marca desde tu celular 192'
    ]
  },
  TIER_2: {
    text:
      'ES PROBABLE QUE ESTE CONTAGIADO CON COVID-19 Y DEBE COMUNICARSE CON SU EMPRESA PRESTADORA DE SERVICIOS.',
    paragraph: [
      'Encuentra la línea telefónica de cada EPS para dar información y atender casos de coronavirus: ',
      'https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/coronavirus-telefonos-eps.pdf',
      'Encuentra la línea telefónica de las Secretaría de Salud de cada Departamento para dar información y atender casos de coronavirus',
      'https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/ED/VSP/coronavirus-telefonos.pdf',
      '¿Por qué? Evitar los contactos con otras personas y las visitas a centros médicos permitirá que estos últimos funcionen con mayor eficacia y ayudará a protegerle a usted y a otras personas de posibles infecciones por el virus de la COVID-19 u otros',
      'Si tiene fiebre, tos y dificultad para respirar, busque rápidamente asesoramiento médico, ya que podría deberse a una infección respiratoria u otra afección grave.',
      '* La enfermedad puede cambiar en menos de 24 horas por lo que los criterios deben ser evaluados nuevamente si cambian los síntomas.'
    ],
    emergencyLine: []
  },
  TIER_1: {
    text:
      'BAJA PROBABILIDAD DE ESTAR CONTAGIADO CON COVID-19, ES MAS PROBABLE QUE TENGA UNA ENFERMEDAD RESPIRATORIA LEVE, REQUIERE CUIDADO EN CASA.',
    paragraph: [
      'Permanezca en casa si empieza a encontrarse mal, aunque se trate de síntomas leves como dolor de cabeza, fiebre ligera (37.3°C o más) y rinorrea leve, hasta que se recupere.',
      '¿Por qué? Evitar los contactos con otras personas y las visitas a centros médicos permitirá que estos últimos funcionen con mayor eficacia y ayudará a protegerle a usted y a otras personas de posibles infecciones por el virus de la COVID-19 u otros.',
      'Si le resulta indispensable salir de casa o recibir una visita (por ejemplo, para conseguir alimentos), póngase una mascarilla para no infectar a otras personas.',
      '* La enfermedad puede cambiar en menos de 24 horas por lo que los criterios deben ser evaluados nuevamente si cambian los síntomas.'
    ],
    emergencyLine: [
      'Bogotá: +57 (1) 330 5041',
      'Resto del país: 01 8000 955 590',
      'Marca desde tu celular 192'
    ]
  },
  TIER_0: {
    text:
      'NO PRESENTA INDICIOS DE CONTAGIO, POR LO QUE SIMPLEMENTE DEBE QUEDARSE EN CASA',
    paragraph: [
      'Si tienes más dudas y quieres comunicarte con el Ministerio de Salud y Protección Social llama a la línea de orientación sobre el nuevo CORONAVIRUS COVID-19:'
    ],
    emergencyLine: [
      'Bogotá: +57 (1) 330 5041',
      'Resto del país: 01 8000 955 590'
    ]
  }
};

export default tierTexts;
