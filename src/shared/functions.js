export const formatAmount = (amount) => Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const validateInterplaza = (accountNumber) => {
  const firstAccNumber = accountNumber.substring(0, 1);

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
