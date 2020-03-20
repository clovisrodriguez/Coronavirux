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
