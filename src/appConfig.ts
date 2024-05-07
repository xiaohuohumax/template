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
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }
  }
};

export default config;