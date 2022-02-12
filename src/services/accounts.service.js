import axios from "axios";
import { reqInterceptor, resInterceptor } from "../shared/axios/interceptors";

export const accountsService = axios.create({
  baseURL: `${process.env.REACT_APP_STAGE === "prod" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL}/accounts-service/api/v1/client`,
  withCredentials: true,
});

reqInterceptor(accountsService);
resInterceptor(accountsService);
