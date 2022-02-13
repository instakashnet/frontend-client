import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const exchangeService = axios.create({
  baseURL: `${process.env.REACT_APP_STAGE === "prod" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL}/exchange-service/api/v1/client`,
  withCredentials: true,
});

reqInterceptor(exchangeService);
resInterceptor(exchangeService);
