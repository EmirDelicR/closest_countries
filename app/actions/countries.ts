'use server';

import { getUserGeolocationByIP } from './ip';

export async function getCountries(searchBy: string): Promise<[]> {
  // TODO check if search is empty then return []

  try {
    // TODO fetch user geo location
    // const ipLocationData = await getUserGeolocationByIP();

    // TODO check if location is not set then return []

    // TODO get and return data
    return [];
  } catch (e) {
    return [];
  }
}
