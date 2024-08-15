import { Paper } from '@mantine/core';
import IpWidget from './components/IpWidget';
import Provider from './Provider';
import CountryWidget from './components/CountryWidget';
import MyGrid from './components/Grid';

export default function HomePage() {
  return (
    <Provider>
      <Paper>
        <IpWidget />
        <CountryWidget />
      </Paper>
      {/* <MyGrid /> */}
    </Provider>
  );
}
