export const readCountriesFromFile = async () => {
  try {
    // TODO read data from file
  } catch (e) {
    return [];
  }
};

export const filterCountries = async (searchBy: string) => {
  // TODO check if search is empty and return []
  
  // TODO get countries from file

  // TODO filter countries by search

  // TODO return countries or empty array 
  return [];
};

export const calculateDistanceBetweenPoints = () => {
  // TODO calculate distance between 2 points, user geo location and countries
};

export const getClosesCountriesByPosition = async (searchBy: string, lat: number, lon: number) => {
  // TODO filter countries
  
  // TODO if filter data is empty skip est and return []
 
  // TODO map data and calculate distance
  
  // TODO return sorted data
};

export function mapCountriesData(data: []): [] {
  // TODO Map data for response to show some of countries details and not all 
  return []
}