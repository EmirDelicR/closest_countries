import { Paper } from '@mantine/core';
import IpWidget from './components/IpWidget';
import Provider from './Provider';
import CountryWidget from './components/CountryWidget';

export default function HomePage() {
  return (
    <Provider>
      <Paper>
        <IpWidget />
        <CountryWidget />
      </Paper>
    </Provider>
  );
}
