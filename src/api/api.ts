import axios from "axios";
import { BE_URL, AUTH_TOKEN } from "../utils/constants";

export async function getRequest<T>(
  path: string,
  params?: Object,
): Promise<T> {
  try {
    const authToken = sessionStorage.getItem(AUTH_TOKEN);

    const config = {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
      params,
    };

    const data = (await axios.get<T>(BE_URL + path, config)).data;
    console.log('Got data from: ' + path);
    return data;

  } catch (error) {
    console.error('Error from reading: ' + path + ', ' + error);
    throw error;
  }
}

export async function postRequest<T, D>(
  path: string,
  data: D,
  params?: Object,
): Promise<T> {
  try {
    const authToken = sessionStorage.getItem(AUTH_TOKEN);

    const config = {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
      params,
    };

    const responseData = (await axios.post<T>(BE_URL + path, data, config)).data;
    console.log('Got data from: ' + path);
    return responseData;

  } catch (error) {
    console.error('Error from reading: ' + path + ', ' + error);
    throw error;
  }
}