import axios from 'axios';
import _ from 'lodash';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

export const createUser = async user =>
  await API.graphql(graphqlOperation(mutations.createUser, { input: user }));

export const createForm = async form =>
  await API.graphql(graphqlOperation(mutations.createForm, { input: form }));

export const createCity = async city =>
  await API.graphql(graphqlOperation(mutations.createCities, { input: city }));

export const getCities = async () =>
  await API.graphql(graphqlOperation(queries.listCitiess, { limit: 1000 }));

export const getINSReport = async () => {
  const body = _.get(
    await axios.get(
      'https://e.infogram.com/api/live/flex/bc384047-e71c-47d9-b606-1eb6a29962e3/664bc407-2569-4ab8-b7fb-9deb668ddb7a?'
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
            let newDate;
            const dateParts = prop.split('/');
            console.log(dateParts);
            newDate = new Date(2020, parseInt(dateParts[0]) - 1, parseInt(dateParts[1]));
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
            confirmCaseObject.deparment = prop.toLowerCase();
            break;
          case 4:
            confirmCaseObject.place = prop.toLowerCase();
            break;
          case 5:
            confirmCaseObject.age = prop;
            break;
          case 6:
            confirmCaseObject.sex = prop;
            break;
          case 7:
            confirmCaseObject.originKind = prop;
            break;
          case 8:
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
