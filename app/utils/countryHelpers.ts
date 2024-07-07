import { promises as fs } from 'fs';
import { Country } from '../interfaces/country';

export const readCountriesFromFile = async (): Promise<Country[] | undefined> => {
  try {
    const file = await fs.readFile(process.cwd() + '/app/utils/data.json', 'utf8');
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
};

export const filterCountries = async (searchBy: string): Promise<Country[]> => {
  if (searchBy.length === 0) {
    return [];
  }

  const allCountries = await readCountriesFromFile();

  const filteredCountries = allCountries?.filter((country) =>
    country.name.toLowerCase().startsWith(searchBy.toLowerCase())
  );

  return filteredCountries || [];
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
