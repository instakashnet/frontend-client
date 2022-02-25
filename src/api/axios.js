import axios from "axios";
import { setupAxiosInterceptors } from "./interceptors";

const BASE_URL = process.env.REACT_APP_STAGE === "prod" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL,
  AUTH_URL = `${BASE_URL}/auth-service/api/v1/client`,
  ACCOUNTS_URL = `${BASE_URL}/accounts-service/api/v1/client`,
  EXCHANGE_URL = `${BASE_URL}/exchange-service/api/v1/client`;

export const authService = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
});

export const exchangeService = axios.create({
  baseURL: EXCHANGE_URL,
  withCredentials: true,
});

export const accountsService = axios.create({
  baseURL: ACCOUNTS_URL,
  withCredentials: true,
});

setupAxiosInterceptors(authService);
setupAxiosInterceptors(exchangeService);
setupAxiosInterceptors(accountsService);
