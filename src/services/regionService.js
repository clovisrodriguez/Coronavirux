import colombianDepartments from '../static-data/colombian-departments';
import _ from 'lodash';

const getDepartments = () => _.map(colombianDepartments, dep => dep.department);

const getCitiesByDepartment = (dep) => {
  const department = _.find(colombianDepartments, { department: dep });

  return !department ? []: department.cities;
};

export {
  getCitiesByDepartment,
  getDepartments,
};
