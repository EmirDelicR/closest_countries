import fs from 'fs';
import {
  filterCountries,
  readCountriesFromFile,
} from './countryHelpers';
import { MOCK_COUNTRY_DATA } from '@/test-utils/mockData';

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

    it('Should return only one item if filter is applied', async () => {
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
});
