import axios from "axios";
import { reqInterceptor, resInterceptor } from "../shared/axios/interceptors";

export const exchangeService = axios.create({
  baseURL: process.env.REACT_APP_STAGE !== "prod" ? `${process.env.REACT_APP_DEV_API_URL}/exchange-service/api/v1/client` : `${process.env.REACT_APP_EXCHANGE_API}/client`,
});

reqInterceptor(exchangeService);
resInterceptor(exchangeService);
