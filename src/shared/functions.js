export const formatAmount = (amount) => Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const validateInterplaza = (accountNumber) => {
  const firstAccNumber = accountNumber.substring(0, 1);

  let interplaza = false;
  if (firstAccNumber >= 3 && firstAccNumber <= 7) interplaza = true;
  return interplaza;
};

export const convertHexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};
