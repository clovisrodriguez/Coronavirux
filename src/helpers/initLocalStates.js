import epidemiologicalCriteria from '../constants/epidemiological-criteria';
import fullAgeSeverities from '../constants/fa-severities';
import minorAgeSeverities from '../constants/ma-severities.';
import riskGroups from '../constants/risk-groups';
import symthomsCriteria from '../constants/synthoms-criteria';

const initEdp = () => Object.entries(epidemiologicalCriteria).reduce((acc, [key]) => {
  acc[key] = false;
  return acc;
}, {});

const initFASeverity = () => Object.entries(fullAgeSeverities).reduce((acc, [key]) => {
  acc[key] = false;
  return acc;
}, {});

const initMASeverity = () => Object.entries(minorAgeSeverities).reduce((acc, [key]) => {
  acc[key] = false;
  return acc;
}, {});

const initRiksGroup = () => Object.entries(riskGroups).reduce((acc, [key]) => {
  acc[key] = false;
  return acc;
}, {});

const initSymthoms = () => Object.entries(symthomsCriteria).reduce((acc, [key]) => {
  acc[key] = false;
  return acc;
}, {});

export {
  initEdp,
  initFASeverity,
  initMASeverity,
  initRiksGroup,
  initSymthoms,
};