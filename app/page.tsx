import { Paper } from "@mantine/core";
import IpWidget from "./components/IpWidget";
import Provider from "./Provider";

export default function HomePage() {
  return (
    <Provider>
      <Paper>
        <IpWidget />
      </Paper>
    </Provider>
  );
}
