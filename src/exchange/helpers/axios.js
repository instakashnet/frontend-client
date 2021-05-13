import axios from 'axios';

const authInstance = axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_TEST_EXCHANGE_API : process.env.REACT_APP_EXCHANGE_API,
  timeout: 8000,
});

const requestLog = (config) => (process.env.NODE_ENV !== 'production' ? console.log(`Request sent to ${config.url}`) : false);

authInstance.interceptors.request.use(
  (config) => {
    const authUser = localStorage.getItem('authData');
    let accessToken;
    if (authUser) accessToken = JSON.parse(authUser).token;
    if (accessToken) config.headers['x-access-token'] = accessToken;

    requestLog(config);
    return config;
  },
  (error) => Promise.reject(error)
);

authInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error);
    console.warn('Error status', error.response ? error.response.status : error.code);

    let message = 'Ha ocurrido un error inesperado, por favor intenta más tarde, si el problema persiste contacte a soporte.';

    if (error.response) {
      const code = error.response.data.code;

      if (code === 4001) message = 'Al parecer no has seleccionado una cuenta para recibir. Por favor intenta de nuevo y verifica los datos.';
      if (code === 4002) message = 'Parece que este nro. de transferencia ya ha sido usado por hoy. Verificalo e intenta de nuevo.';
      if (code === 4003) message = 'El cupón que intentas usar no existe o no está disponible. Verificalo e intenta de nuevo.';
      if (code === 4004) message = 'Este cupón ya lo has usado con anterioridad. Por favor intenta con otro.';
      if (code === 4005) message = 'Se ha agotado el tiempo para esta solicitud de cambio de divisas. Debes crear una nueva solicitud.';
      if (code === 4008) message = 'En estos momentos estams realizando unas actualizaciones, por ese mótivo su solicitud no puede ser generada. Agradecemos su comprensión.';
      if (code === 4019) message = 'No estás autorizado para utilizar este cupón.';

      error.response.message = message;
      return Promise.reject(error.response);
    } else if (error.request) {
      message = 'Se ha caido la conexión, por favor revise su conexión a internet. Si el problema persiste contacte a soporte.';
      error.message = message;
    } else error.message = message;
    return Promise.reject(error);
  }
);

export default authInstance;
