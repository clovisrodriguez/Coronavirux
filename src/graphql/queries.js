/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCities = `query GetCities($id: ID!) {
  getCities(id: $id) {
    id
    name
    location {
      lat
      lng
    }
  }
}
`;
export const listCitiess = `query ListCitiess(
  $filter: ModelcitiesFilterInput
  $limit: Int
  $nextToken: String
) {
  listCitiess(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      location {
        lat
        lng
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      firstName
      lastName
      docType
      phoneNumber
      mail
      symptoms
      formId
    }
    nextToken
  }
}
`;
export const getForm = `query GetForm($id: ID!) {
  getForm(id: $id) {
    id
    location {
      lat
      lng
    }
    level
  }
}
`;
export const listForms = `query ListForms(
  $filter: ModelFormFilterInput
  $limit: Int
  $nextToken: String
) {
  listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      location {
        lat
        lng
      }
      level
    }
    nextToken
  }
}
`;
