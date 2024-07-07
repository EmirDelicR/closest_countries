import { IpData } from "../interfaces/ip";

export async function getUserGeolocationByIP(): Promise<IpData | undefined> {
  try {
    const response = await fetch(`http://ip-api.com/json`);
    const jsonData = await response.json();

    return jsonData;
  } catch (e) {
    return undefined;
  }
}
