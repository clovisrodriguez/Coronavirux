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
            confirmCaseObject.zeroToNine = prop === 'X';
            break;
          case 5:
            confirmCaseObject.tenToNineteen = prop === 'X';
            break;
          case 6:
            confirmCaseObject.twentyToTweenyNine = prop === 'X';
            break;
          case 7:
            confirmCaseObject.thirtyToThirtyNine = prop === 'X';
            break;
          case 8:
            confirmCaseObject.forthyToForthyNine = prop === 'X';
            break;
          case 9:
            confirmCaseObject.FifthyToFiftyNine = prop === 'X';
            break;
          case 10:
            confirmCaseObject.sixtyToSixtynine = prop === 'X';
            break;
          case 11:
            confirmCaseObject.seventyToSeventyNine = prop === 'X';
            break;
          case 12:
            confirmCaseObject.eigthyToEightyNine = prop === 'X';
            break;
          case 13:
            confirmCaseObject.NinetyToOver = prop === 'X';
            break;
          case 14:
            confirmCaseObject.femine = prop === 'X';
            break;
          case 15:
            confirmCaseObject.male = prop === 'X';
            break;
          case 16:
            confirmCaseObject.import = prop === 'X';
            break;
          case 17:
            confirmCaseObject.local = prop === 'X';
            break;
          default:
        }
      });
    }
    return confirmCaseObject;
  });

  return confirmCases.slice(1);
};
