// IMPORTS
import history from "./history";


export const formatAmount = (amount) => {
  return Number(amount).toFixed(2);
};

export const convertRate = (amount) => Number(amount).toFixed(4);

export const validateInterplaza = (accountNumber) => {
  const firstAccNumber = Number(accountNumber.substring(0, 1));

  let interplaza = false;
  if (firstAccNumber >= 3 && firstAccNumber <= 7) interplaza = true;
  return interplaza;
};

export function convertHexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export const AllowOnlyNumbers = (value) => {
  const re = /^[0-9\b]+$/;
  return value === "" || re.test(value);
};

export const replaceSpace = (text) => text.split(" ").join("-");

export const encodeFileToBase64URL = (file) => {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(file);
  });
};

// LAZY IMPORTS HANDLER
export const importsHandler = (lazyImport) => {
  return new Promise((resolve, reject) => {
    const hasRefreshed = JSON.parse(
      sessionStorage.getItem("retry-refreshed") || "false"
    );

    lazyImport()
      .then((component) => {
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          history.push("/");
          sessionStorage.setItem("retry-refreshed", "true");
          return window.location.reload();
        };

        reject(error);
      });
  })
};