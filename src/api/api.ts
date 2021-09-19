import axios from "axios";
import { BE_URL, AUTH_TOKEN } from "../utils/constants";

export async function getRequest<T>(
  path: string
) : Promise<T> 
{
  try {
    const authToken = sessionStorage.getItem(AUTH_TOKEN);

    const config = {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    };

    const data = (await axios.get<T>(BE_URL + path, config)).data;
    console.log('Got data from: ' + path);
    return data;

  } catch (error) { 
    console.error('Error from reading: ' + path + ', ' + error);
    throw error;
  }
}
