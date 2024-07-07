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

export const calculateDistanceBetweenPoints = (
  userLatitude: number,
  userLongitude: number,
  countryPosition: number[]
) => {
  const [countryLatitude, countryLongitude] = countryPosition;
  const userLatRadius = (Math.PI * userLatitude) / 180;
  const countryLatRadius = (Math.PI * countryLatitude) / 180;
  const theta = userLongitude - countryLongitude;
  const radiusTheta = (Math.PI * theta) / 180;

  var dist =
    Math.sin(userLatRadius) * Math.sin(countryLatRadius) +
    Math.cos(userLatRadius) * Math.cos(countryLatRadius) * Math.cos(radiusTheta);

  if (dist > 1) {
    dist = 1;
  }

  if (isNaN(dist)) {
    // Maybe return big number if country don't have position to be as far away as possible
    dist = 0.001;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  return dist;
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
