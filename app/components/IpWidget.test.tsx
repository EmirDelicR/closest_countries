import { render, screen } from '@/test-utils';
import IpWidget from './IpWidget';
import { MOCK_IP_DATA } from '@/test-utils/mockData';

const mockServerGetUserGeolocationByIP = jest.fn();

let mockUseMutationData = {
  data: MOCK_IP_DATA,
  mutate: mockServerGetUserGeolocationByIP,
  isPending: false,
  isError: false,
  isIdle: false,
};

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual<Record<string, unknown>>('@tanstack/react-query'),
  useMutation: () => mockUseMutationData,
}));

describe('IpWidget component', () => {
  beforeEach(() => {
    mockUseMutationData = {
      data: MOCK_IP_DATA,
      mutate: mockServerGetUserGeolocationByIP,
      isPending: false,
      isError: false,
      isIdle: false,
    };
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render loader if state is pending', () => {
    mockUseMutationData = {
      ...mockUseMutationData,
      isPending: true,
    };
    render(<IpWidget />);

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  it('should render loader if state is idle', () => {
    mockUseMutationData = {
      ...mockUseMutationData,
      isIdle: true,
    };
    render(<IpWidget />);

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  it('should render error message if state is error', () => {
    mockUseMutationData = {
      ...mockUseMutationData,
      isError: true,
    };
    render(<IpWidget />);

    expect(screen.getByText('Fail to load data')).toBeInTheDocument();
  });

  it('should render no data message if data is not set', () => {
    mockUseMutationData = {
      ...mockUseMutationData,
      data: undefined as any,
    };
    render(<IpWidget />);

    expect(screen.getByText('There is no current information.')).toBeInTheDocument();
  });

  it('should render elements if there is data', () => {
    render(<IpWidget />);

    expect(screen.getByText('City:')).toBeInTheDocument();
    expect(screen.getByText(MOCK_IP_DATA.city)).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
    expect(screen.getByText(MOCK_IP_DATA.country)).toBeInTheDocument();
    expect(screen.getByText('Latitude:')).toBeInTheDocument();
    expect(screen.getByText(MOCK_IP_DATA.lat)).toBeInTheDocument();
    expect(screen.getByText('Longitude:')).toBeInTheDocument();
    expect(screen.getByText(MOCK_IP_DATA.lon)).toBeInTheDocument();
  });
});
