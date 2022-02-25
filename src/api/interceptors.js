import { logoutSuccess } from "../store/actions";

const requestLog = (config) => (process.env.REACT_APP_STAGE === "dev" ? console.log(`Request sent to ${config.url}`) : false);

let store;
export const injectStore = (_store) => {
  store = _store;
};

export const setupAxiosInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      requestLog(config);

      const accessToken = store.getState().Auth.token;
      if (accessToken) config.headers["x-access-token"] = accessToken;
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      const configRequest = error?.config,
        status = error.status || error.response.status;

      console.warn("Error status: ", status || error.code);
      console.log(error);

      if (status === 418 && !configRequest._retry && store.getState().Auth.isAuth) {
        configRequest._retry = true;
        return store.dispatch(logoutSuccess());
      } else {
        let message;
        let code;

        if (error.response) {
          if (error.response.data.error) {
            message = error.response.data.error.message;
            code = error.response.data.error.code;
          } else message = "Ha ocurrido un error inesperado, por favor intenta de nuevo. Si el problema persiste contacte a soporte.";
        } else if (error.request) message = "Se ha caido la conexión, por favor revise su conexión a internet. Si el problema persiste contacte a soporte.";

        error.code = code;
        error.message = message;

        return Promise.reject(error);
      }
    }
  );
};
