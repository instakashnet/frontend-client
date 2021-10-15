import axios from "axios";
import { reqInterceptor, resInterceptor } from "../shared/axios/interceptors";

export const authService = axios.create({
  baseURL: process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_AUTH_API : process.env.REACT_APP_AUTH_API,
});

reqInterceptor(authService, "auth");
resInterceptor(authService);
