import axios from 'axios';
import _ from 'lodash';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

export const createCity = async city =>
  await API.graphql(graphqlOperation(mutations.createCities, { input: city }));

export const getCities = async () =>
  await API.graphql(graphqlOperation(queries.listCitiess, { limit: 1000 }));

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
            const validDate = Date.parse(prop);
            let newDate;
            if (isNaN(validDate)) {
              const dateParts = prop.split('/');
              newDate = new Date(
                +dateParts[2],
                dateParts[1] - 1,
                +dateParts[0]
              );
            } else {
              newDate = new Date(prop);
            }
            confirmCaseObject.date = newDate.toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
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
