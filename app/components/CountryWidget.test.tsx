import { render, screen, userEvent, waitFor } from '@/test-utils';
import CountryWidget from './CountryWidget';
import { MOCK_API_RESPONSE_COUNTRY_DATA } from '@/test-utils/mockData';

const mockServerGetCountries = jest.fn();

let mockUseMutationData = {
  data: MOCK_API_RESPONSE_COUNTRY_DATA,
  mutate: mockServerGetCountries,
  isPending: false,
  isError: false,
  isIdle: false,
};

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual<Record<string, unknown>>('@tanstack/react-query'),
  useMutation: () => mockUseMutationData,
}));

describe('CountryWidget component', () => {
  beforeEach(() => {
    mockUseMutationData = {
      data: MOCK_API_RESPONSE_COUNTRY_DATA,
      mutate: mockServerGetCountries,
      isPending: false,
      isError: false,
      isIdle: false,
    };

    mockServerGetCountries.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render loader if state is pending', async () => {
    mockUseMutationData = {
      ...mockUseMutationData,
      isPending: true,
    };
    render(<CountryWidget />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'a');

    await waitFor(
      () => {
        expect(screen.getByRole('loader')).toBeInTheDocument();
      },
      { interval: 500 }
    );

    expect(mockServerGetCountries).toHaveBeenCalledWith('a');
  });

  it('should render error message if state is error', async () => {
    mockUseMutationData = {
      ...mockUseMutationData,
      isError: true,
    };
    render(<CountryWidget />);

    expect(screen.getByText('Fail to load data')).toBeInTheDocument();
  });

  it('should render no data message if data is not set', () => {
    mockUseMutationData = {
      ...mockUseMutationData,
      data: undefined as any,
    };
    render(<CountryWidget />);

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('should render elements if there is data', () => {
    render(<CountryWidget />);

    expect(screen.getByText(MOCK_API_RESPONSE_COUNTRY_DATA[0].value)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Region: ${MOCK_API_RESPONSE_COUNTRY_DATA[0].region} - Capital: ${MOCK_API_RESPONSE_COUNTRY_DATA[0].capital}`
      )
    ).toBeInTheDocument();
  });
});
