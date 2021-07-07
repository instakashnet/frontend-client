const authCodes = [
  { code: 2000, message: "Faltan campos por llenar, por favor verifica todos tus datos ingresados." },
  { code: 2001, message: "El correo ingresado ya se encuentra registrado, por favor intenta con otro." },
  { code: 2002, message: "No se ha encontrado una cuenta con el correo ingresado, por favor verifique el correo." },
  { code: 2003, message: "El teléfono que ha colocado ya se encuentra registrado, por favor intente con otro." },
  { code: 2004, message: "Usuario y/o contraseña inválida, por favor verifique sus datos." },
];

export const getGodeMessage = (code, type) => {
  switch (type) {
    case "auth":
      return authCodes.find((c) => c.code === code).message;
    default:
      return "";
  }
};
