const authCodes = [
  { code: 2001, message: "El correo ingresado ya se encuentra registrado, por favor intenta con otro." },
  { code: 2002, message: "No se ha encontrado una cuenta con el correo ingresado, por favor verifique el correo." },
  { code: 2003, message: "El teléfono que ha colocado ya se encuentra registrado, por favor intente con otro." },
  { code: 2004, message: "Usuario y/o contraseña inválida, por favor verifique sus datos." },
  { code: 2005, message: "Este nro. de documento ya se encuentra registrado. por favor verifique sus datos." },
  { code: 2006, message: "Este RUC ya se encuentra registrado. por favor verifique sus datos." },
  { code: 2007, message: "El nro. documento ingresado es inválido. por favor verifique sus datos." },
  { code: 2008, message: "No estas habilitado para acceder con estos datos. Por favor contacta a soporte." },
  { code: 2009, message: "El nombre de usuario que intentas agregar ya exíste. Por favor intenta con otro." },
  { code: 2010, message: "No existe ningún usuario con el código de afiliado que intentas ingresar." },
  { code: 2011, message: "El nombre de usuario debe ser entre 9 y 12 caracteres, con al menos 1 número." },
  { code: 2012, message: "Ya haz alcanzado el máximo de perfiles que puedes agregar." },
  { code: 2013, message: "Solo se permite cargar archivos en formato JPG, PNG y PDF." },
];

const exchangeCodes = [
  { code: 4001, message: "Debes esperar al menos 1 minuto para crear otro pedido." },
  { code: 4002, message: "En estos momentos no estamos aceptando nuevos pedidos." },
  { code: 4003, message: "Este cupón no está permitido usar para este pedido." },
  { code: 4004, message: "Esta pedido ya ha expirado, deberás crear un nuevo pedido." },
  { code: 4005, message: "Debes seleccionar el origen de tus fondos." },
  { code: 4007, message: "El nro. de operación que intentas ingresar ya ha sido usado hoy." },
  { code: 4008, message: "El monto mínimo para cambiar divisas es de 1$." },
  { code: 4009, message: "No posees suficiente balance de KASH para usar." },
  { code: 4010, message: "El monto que envías es menor que el permitido por el cupón." },
  { code: 4011, message: "Este cupón no está disponible para el tipo de perfil que deseas usar." },
  { code: 4012, message: "No puedes usar más este cupón." },
  { code: 4013, message: "No estás habilitado para usar este cupón." },
];

const accountCodes = [
  { code: 3001, message: "Solo puedes agregar un nro. de cuenta bancario o interbancario." },
  { code: 3002, message: "El nro. de cuenta que intentas agregar ya se encuentra registrado." },
  { code: 3003, message: "El alias debe ser de un mínimo de 5 caracteres." },
];

export const getCodeMessage = (code, type) => {
  switch (type) {
    case "auth":
      return authCodes.find((c) => c.code === code).message;
    case "exchange":
      return exchangeCodes.find((c) => c.code === code).message;
    case "account":
      return accountCodes.find((c) => c.code === code).message;
    default:
      return "";
  }
};
