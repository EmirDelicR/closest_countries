import fs from 'fs';
import {
  calculateDistanceBetweenPoints,
  filterCountries,
  getClosesCountriesByPosition,
  mapCountriesData,
  readCountriesFromFile,
} from './countryHelpers';
import { MOCK_COUNTRY_DATA } from '@/test-utils/mockData';
import { Country } from '../interfaces/country';

describe('Country helpers test', () => {
  const readFileSpy = jest.spyOn(fs.promises, 'readFile');

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('readCountriesFromFile function test', () => {
    beforeEach(() => {
      readFileSpy.mockReset();
    });

    it('Should return data if readFile is success', async () => {
      readFileSpy.mockResolvedValue(JSON.stringify(MOCK_COUNTRY_DATA));

      expect((await readCountriesFromFile())?.length).toEqual(MOCK_COUNTRY_DATA.length);
    });

    it('Should return empty array if readFile throws exception', async () => {
      readFileSpy.mockImplementation(() => {
        throw new Error('Error occurred');
      });

      expect(await readCountriesFromFile()).toEqual([]);
    });
  });

  describe('filterCountries function test', () => {
    beforeEach(() => {
      readFileSpy.mockReset();
    });

    it('Should return empty array if search parameter is empty', async () => {
      readFileSpy.mockResolvedValue(JSON.stringify(MOCK_COUNTRY_DATA));

      expect((await filterCountries(''))?.length).toEqual(0);
      expect((await filterCountries('   '))?.length).toEqual(0);
    });

    it('Should return only one item if filter is applied', async () => {
      readFileSpy.mockResolvedValue(JSON.stringify(MOCK_COUNTRY_DATA));

      expect((await filterCountries(MOCK_COUNTRY_DATA[0].name))?.length).toEqual(1);
    });

    it('Should return empty list if filter is applied and no data is found', async () => {
      readFileSpy.mockResolvedValue(JSON.stringify(MOCK_COUNTRY_DATA));

      expect((await filterCountries('Sparta'))?.length).toEqual(0);
    });

    it('Should return empty array if read file throws exception', async () => {
      readFileSpy.mockImplementation(() => {
        throw new Error('Error occurred');
      });

      expect(await filterCountries('al')).toEqual([]);
    });
  });

  describe('calculateDistanceBetweenPoints function test', () => {
    beforeEach(() => {
      readFileSpy.mockReset();
    });

    it('Should return distance for elements', () => {
      readFileSpy.mockResolvedValue(JSON.stringify(MOCK_COUNTRY_DATA));

      expect(calculateDistanceBetweenPoints(10, 10, MOCK_COUNTRY_DATA[0].latlng)).toEqual(
        3825.347384334331
      );
      expect(calculateDistanceBetweenPoints(0, 0, MOCK_COUNTRY_DATA[0].latlng)).toEqual(
        4783.862496490037
      );
      expect(calculateDistanceBetweenPoints(0, 0, [])).toEqual(6214.141433933682);
      expect(calculateDistanceBetweenPoints(0, 0, [1])).toEqual(6214.141433933682);
    });
  });

  describe('getClosesCountriesByPosition function test', () => {
    beforeEach(() => {
      readFileSpy.mockReset();
    });

    it('Should return empty array if no data', async () => {
      readFileSpy.mockResolvedValue(JSON.stringify(MOCK_COUNTRY_DATA));

      expect(await getClosesCountriesByPosition('Sparta', 10, 10)).toEqual([]);
    });

    it('Should return elements with closest distance', async () => {
      readFileSpy.mockResolvedValue(JSON.stringify(MOCK_COUNTRY_DATA));

      expect(await getClosesCountriesByPosition('A', 10, 10)).toEqual([
        { ...MOCK_COUNTRY_DATA[1] },
        { ...MOCK_COUNTRY_DATA[0] },
      ]);

      expect(await getClosesCountriesByPosition('A', 30, 50)).toEqual(MOCK_COUNTRY_DATA);
    });
  });

  describe('mapCountriesData function test', () => {
    beforeEach(() => {
      readFileSpy.mockReset();
    });

    it('Should return mapped values', () => {
      readFileSpy.mockResolvedValue(JSON.stringify(MOCK_COUNTRY_DATA));

      const data = mapCountriesData(MOCK_COUNTRY_DATA as unknown as Country[]);

      expect(data.length).toEqual(2);
      expect(data[0]).toHaveProperty('value');
      expect(data[0]).toHaveProperty('label');
      expect(data[0]).toHaveProperty('flag');
      expect(data[0]).toHaveProperty('capital');
      expect(data[0]).toHaveProperty('region');

      expect(data[0].value).toEqual(MOCK_COUNTRY_DATA[0].name);
      expect(data[0].label).toEqual(MOCK_COUNTRY_DATA[0].name);
      expect(data[0].flag).toEqual(MOCK_COUNTRY_DATA[0].flag);
      expect(data[0].capital).toEqual(MOCK_COUNTRY_DATA[0].capital);
      expect(data[0].region).toEqual(MOCK_COUNTRY_DATA[0].region);
    });
  });
});
