import appConfig from '@/appConfig';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const service = axios.create(appConfig.axios.create);

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface CustomAxiosInstance extends AxiosInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <R = any, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <R = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

export default service as CustomAxiosInstance;