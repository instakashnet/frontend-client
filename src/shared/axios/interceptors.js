const requestLog = (config) => (process.env.NODE_ENV !== "production" ? console.log(`Request sent to ${config.url}`) : false);

let store;

export const injectStore = (_store) => {
  store = _store;
};

export const reqInterceptor = (instance) =>
  instance.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().Auth.token;
      if (accessToken) config.headers["x-access-token"] = accessToken;

      requestLog(config);
      return config;
    },
    (error) => Promise.reject(error)
  );

export const resInterceptor = (instance) =>
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.warn("Error status", error.response ? error.response.status : error.code);
      console.log(error);

      let message;
      let code;
      if (error.response) {
        if (error.response.data.error) {
          message = error.response.data.error.message;
          code = error.response.data.error.code;
        } else message = "Ha ocurrido un error inesperado, por favor intenta de nuevo. Si el problema persiste contacte a soporte.";
      } else if (error.request) message = "Se ha caido la conexión, por favor revise su conexión a internet. Si el problema persiste contacte a soporte.";

      error.message = message;
      error.code = code;

      return Promise.reject(error);
    }
  );
