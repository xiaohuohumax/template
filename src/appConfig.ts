import { CreateAxiosDefaults } from 'axios';

export interface AppConfig {
  axios: {
    create: CreateAxiosDefaults
  }
}

const config: AppConfig = {
  axios: {
    create: {
      baseURL: '/api/',
      timeout: 5000,
    }
  }
};

export default config;