import axios from "axios";

const authInstance = axios.create({
  baseURL: process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_AUTH_API : process.env.REACT_APP_AUTH_API,
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
    console.warn("Error status", error.response ? error.response.status : error.code);
    console.log(error);

    let message = "Ha ocurrido un error inesperado, por favor intenta más tarde, si el problema persiste contacte a soporte.";

    if (error.response) {
      const code = error.response.data.code;

      if (code === 2001) message = "El correo que ha colocado ya se encuentra registrado, por favor intente con otro.";
      if (code === 2002) message = "No se ha encontrado una cuenta con el correo ingresado, por favor verifique el correo.";
      if (code === 2003) message = "El teléfono que ha colocado ya se encuentra registrado, por favor intente con otro.";
      if (code === 2004) message = "Usuario y/o contraseña inválida, por favor verifique sus datos.";
      if (code === 2005) message = "El documento que intentas agregar ya  exíste. Por favor verifique sus datos.";
      if (code === 2007) message = "El nro. de su DNI debe ser de 8 caracteres. Por favor, verifique los datos.";
      if (code === 2009) message = "El nombre de usuario que intentas agregar ya exíste. Por favor verifique sus datos.";
      if (code === 2010) message = "No existe ningún usuario con el código de afiliado que intentas ingresar.";

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
