import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const authService = axios.create({
  baseURL: `${process.env.REACT_APP_STAGE === "prod" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL}/auth-service/api/v1/client`,
  withCredentials: true,
});

reqInterceptor(authService);
resInterceptor(authService);
