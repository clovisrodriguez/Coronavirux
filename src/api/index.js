import axios from 'axios';
import _ from 'lodash';

export const getINSReport = async () => {
  const body = _.get(
    await axios.get(
      'https://e.infogram.com/api/live/flex/0e44ab71-9a20-43ab-89b3-0e73c594668f/dfee1a5c-5cc8-4e90-8efb-d5bdf2803bf6'
    ),
    'data.data'
  );

  const confirmCases = _.flatMap(body).map((confirmCase, i) => {
    const confirmCaseObject = {};

    if (i) {
      confirmCase.forEach((prop, i) => {
        switch (i) {
          case 0:
            confirmCaseObject.id = prop;
            break;
          case 1:
            confirmCaseObject.date = prop;
            break;
          case 2:
            confirmCaseObject.city = prop.replace(/\s/g, '');
            break;
          case 3:
            confirmCaseObject.place = prop;
            break;
          case 4:
            confirmCaseObject.age = prop;
            break;
          case 5:
            confirmCaseObject.sex = prop;
            break;
          case 6:
            confirmCaseObject.originKind = prop;
            break;
          case 7:
            confirmCaseObject.origin = prop;
            break;
          default:
        }
      });
    }
    return confirmCaseObject;
  });

  return confirmCases.slice(1);
};
