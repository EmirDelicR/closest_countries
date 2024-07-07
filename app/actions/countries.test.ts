import * as ip from './ip';
import * as helpers from '../utils/countryHelpers';
import { getCountries } from './countries';
import { MOCK_COUNTRY_DATA } from '@/test-utils/mockData';
import { ApiResponseCountry, Country } from '../interfaces/country';
import { IpData } from '../interfaces/ip';

jest.mock('./ip');
jest.mock('../utils/countryHelpers');

const USER_IP = {
  lat: 10,
  lon: 10,
};

describe('Country helpers test', () => {
  const getUserGeolocationByIPSpy = jest.spyOn(ip, 'getUserGeolocationByIP');
  const getClosesCountriesByPositionSpy = jest.spyOn(helpers, 'getClosesCountriesByPosition');
  const mapCountriesDataSpy = jest.spyOn(helpers, 'mapCountriesData');

  beforeEach(() => {
    getUserGeolocationByIPSpy.mockReset().mockResolvedValue(USER_IP as unknown as IpData);
    getClosesCountriesByPositionSpy.mockReset().mockResolvedValue(MOCK_COUNTRY_DATA as Country[]);
    mapCountriesDataSpy
      .mockReset()
      .mockReturnValue(MOCK_COUNTRY_DATA as unknown as ApiResponseCountry[]);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should return empty array if search is empty', async () => {
    expect(await getCountries(' ')).toEqual([]);
    expect(await getCountries('')).toEqual([]);
    expect(await getCountries('   ')).toEqual([]);
  });

  it('Should return empty array if no latitude', async () => {
    getUserGeolocationByIPSpy.mockResolvedValue({ lat: null, lon: 10 } as unknown as IpData);
    expect(await getCountries('test')).toEqual([]);
  });

  it('Should return data if all is ok', async () => {
    expect((await getCountries('test')).length).toEqual(2);
  });

  it('Should return empty array if getUserGeolocationByIP throws exception', async () => {
    getUserGeolocationByIPSpy.mockImplementation(() => {
      throw new Error('Error occurred');
    });
    expect(await getCountries('test')).toEqual([]);
  });
});
