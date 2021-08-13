import axios from "axios";
import { reqInterceptor, resInterceptor } from "../../shared/axios/interceptors";

const authInstance = axios.create({
  baseURL: `${process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_AUTH_API : process.env.REACT_APP_AUTH_API}/client`,
  timeout: 15000,
});

reqInterceptor(authInstance);
resInterceptor(authInstance, "auth");

export default authInstance;
