import axios from "axios";

const authInstance = axios.create({
  baseURL: `${process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_ACCOUNTS_API : process.env.REACT_APP_ACCOUNTS_API}/client`,
  timeout: 8000,
});

const requestLog = (config) => (process.env.NODE_ENV !== "production" ? console.log(`Request sent to ${config.url}`) : false);

authInstance.interceptors.request.use(
  (config) => {
    const authUser = localStorage.getItem("authData");
    let accessToken;
    if (authUser) accessToken = JSON.parse(authUser).token;
    if (accessToken) config.headers["x-access-token"] = accessToken;

    requestLog(config);
    return config;
  },
  (error) => Promise.reject(error)
);

authInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error);
    console.warn("Error status", error.response ? error.response.status : error.code);

    let message = "Ha ocurrido un error inesperado, por favor intenta más tarde, si el problema persiste contacte a soporte.";

    if (error.response) {
      const code = error.response.data.code;

      if (code === 3001) message = "Este número de cuenta ya existe, por favor revisalo o intenta con otro.";

      error.response.message = message;
      return Promise.reject(error.response);
    } else if (error.request) {
      message = "Se ha caido la conexión, por favor revise su conexión a internet. Si el problema persiste contacte a soporte.";
      error.message = message;
    } else error.message = message;
    return Promise.reject(error);
  }
);

export default authInstance;
