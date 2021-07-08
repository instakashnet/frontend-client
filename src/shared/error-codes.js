const authCodes = [
  { code: 2000, message: "Faltan campos por llenar, por favor verifica todos tus datos ingresados." },
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

export const getGodeMessage = (code, type) => {
  switch (type) {
    case "auth":
      return authCodes.find((c) => c.code === code).message;
    default:
      return "";
  }
};
