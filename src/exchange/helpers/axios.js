import axios from "axios";
import { reqInterceptor, resInterceptor } from "../../shared/axios/interceptors";

const exchangeInstance = axios.create({
  baseURL: `${process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_EXCHANGE_API : process.env.REACT_APP_EXCHANGE_API}/client`,
  timeout: 15000,
});

reqInterceptor(exchangeInstance);
resInterceptor(exchangeInstance, "exchange");

export default exchangeInstance;
