/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCities = `mutation CreateCities(
  $input: CreateCitiesInput!
  $condition: ModelcitiesConditionInput
) {
  createCities(input: $input, condition: $condition) {
    id
    name
    location {
      lat
      lng
    }
  }
}
`;
export const updateCities = `mutation UpdateCities(
  $input: UpdateCitiesInput!
  $condition: ModelcitiesConditionInput
) {
  updateCities(input: $input, condition: $condition) {
    id
    name
    location {
      lat
      lng
    }
  }
}
`;
export const deleteCities = `mutation DeleteCities(
  $input: DeleteCitiesInput!
  $condition: ModelcitiesConditionInput
) {
  deleteCities(input: $input, condition: $condition) {
    id
    name
    location {
      lat
      lng
    }
  }
}
`;
export const createUser = `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    firstName
    lastName
    docType
    phoneNumber
    mail
    symptoms
    formId
  }
}
`;
export const updateUser = `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    firstName
    lastName
    docType
    phoneNumber
    mail
    symptoms
    formId
  }
}
`;
export const deleteUser = `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    firstName
    lastName
    docType
    phoneNumber
    mail
    symptoms
    formId
  }
}
`;
export const createForm = `mutation CreateForm(
  $input: CreateFormInput!
  $condition: ModelFormConditionInput
) {
  createForm(input: $input, condition: $condition) {
    id
    location {
      lat
      lng
    }
    mail
    phoneNumber
    level
    city
    department
    age
    gender
  }
}
`;
export const updateForm = `mutation UpdateForm(
  $input: UpdateFormInput!
  $condition: ModelFormConditionInput
) {
  updateForm(input: $input, condition: $condition) {
    id
    location {
      lat
      lng
    }
    mail
    phoneNumber
    level
    city
    department
    age
    gender
  }
}
`;
export const deleteForm = `mutation DeleteForm(
  $input: DeleteFormInput!
  $condition: ModelFormConditionInput
) {
  deleteForm(input: $input, condition: $condition) {
    id
    location {
      lat
      lng
    }
    mail
    phoneNumber
    level
    city
    department
    age
    gender
  }
}
`;
