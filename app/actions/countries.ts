'use server';

import { ApiResponseCountry } from '../interfaces/country';
import { getClosesCountriesByPosition, mapCountriesData } from '../utils/countryHelpers';
import { getUserGeolocationByIP } from './ip';

export async function getCountries(searchBy: string): Promise<ApiResponseCountry[]> {
  if (searchBy.trim().length === 0) {
    return [];
  }

  try {
    const ipLocationData = await getUserGeolocationByIP();

    if (!ipLocationData?.lat || !ipLocationData?.lon) {
      return [];
    }

    const data = await getClosesCountriesByPosition(
      searchBy,
      ipLocationData?.lat,
      ipLocationData?.lon
    );

    return mapCountriesData(data);
  } catch (e) {
    return [];
  }
}
