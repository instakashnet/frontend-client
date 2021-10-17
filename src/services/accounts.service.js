import axios from "axios";
import { reqInterceptor, resInterceptor } from "../shared/axios/interceptors";

export const accountsService = axios.create({
  baseURL: `${process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_ACCOUNTS_API : process.env.REACT_APP_ACCOUNTS_API}/client`,
});

reqInterceptor(accountsService);
resInterceptor(accountsService);
