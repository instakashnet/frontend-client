import axios from "axios";
import { reqInterceptor, resInterceptor } from "../shared/axios/interceptors";

export const authService = axios.create({
  baseURL: process.env.REACT_APP_STAGE !== "prod" ? `${process.env.REACT_APP_DEV_API_URL}/auth-service/api/v1/client` : `${process.env.REACT_APP_AUTH_API}/client`,
});

reqInterceptor(authService, "auth");
resInterceptor(authService);
