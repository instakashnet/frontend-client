const requestLog = (config) => (process.env.NODE_ENV !== "production" ? console.log(`Request sent to ${config.url}`) : false);

export const reqInterceptor = (instance) =>
  instance.interceptors.request.use(
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

export const resInterceptor = (instance) =>
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.warn("Error status", error.response ? error.response.status : error.code);
      console.log(error);

      let message = "Ha ocurrido un error inesperado, por favor intenta más tarde, si el problema persiste contacte a soporte.";

      if (error.response) {
        error.response.message = error.response.data.error
          ? error.response.data.error.message
          : "Ha ocurrido un error inesperado, intente de nuevo. Si el problema persiste contacte a soporte.";
        return Promise.reject(error.response);
      } else if (error.request) {
        message = "Se ha caido la conexión, por favor revise su conexión a internet. Si el problema persiste contacte a soporte.";
        error.message = message;
      } else error.message = message;
      return Promise.reject(error);
    }
  );
