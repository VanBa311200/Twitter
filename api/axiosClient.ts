import axios, { AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// config response, auto return data of response
axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    const { data } = res;
    return data;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
