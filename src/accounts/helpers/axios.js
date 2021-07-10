import axios from "axios";
import { reqInterceptor, resInterceptor } from "../../shared/axios/interceptors";

const accountInstance = axios.create({
  baseURL: `${process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_ACCOUNTS_API : process.env.REACT_APP_ACCOUNTS_API}/client`,
  timeout: 8000,
});

reqInterceptor(accountInstance);
resInterceptor(accountInstance, "account");

export default accountInstance;
