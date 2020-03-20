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
