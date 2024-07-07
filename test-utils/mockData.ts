import { ApiResponseCountry } from "@/app/interfaces/country";

export const MOCK_IP_DATA = {
  city: 'Vienna',
  country: 'Austria',
  lat: 10,
  lon: 20,
};

export const MOCK_COUNTRY_DATA = [
  {
    name: 'Afghanistan',
    capital: 'Kabul',
    region: 'Asia',
    latlng: [33, 65],
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
  },
  {
    name: 'Aland Islands',
    capital: 'Mariehamn',
    region: 'Europe',
    latlng: [60.116667, 19.9],
    flag: 'https://flagcdn.com/ax.svg',
  },
];

export const MOCK_API_RESPONSE_COUNTRY_DATA: ApiResponseCountry[] = [
  {
    capital: 'Vienna',
    region: 'Europa',
    flag: 'flag',
    value: 'Austria',
    label: 'Austria',
  },
];