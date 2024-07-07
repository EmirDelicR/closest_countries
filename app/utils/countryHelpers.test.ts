import fs from 'fs';
import {
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
});
