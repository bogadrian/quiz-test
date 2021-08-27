import axios, { AxiosResponse, AxiosError } from 'axios';

const urlBase: string | undefined = process.env.REACT_APP_URL_ENDPOINT;

export const makeCallToGetQuestions = async () => {
  try {
    const results: AxiosResponse = await axios.get(`${urlBase}?amount=10`);

    return results?.data?.results;
  } catch (err: AxiosError | unknown) {
    throw new Error((err as AxiosError).message);
  }
};
