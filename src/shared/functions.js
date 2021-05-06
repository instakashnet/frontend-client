export const formatAmount = (amount) => Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const validateInterplaza = (accountNumber) => {
  const firstAccNumber = accountNumber.substring(0, 1);

  let interplaza = false;
  if (firstAccNumber >= 3 && firstAccNumber <= 7) interplaza = true;
  return interplaza;
};
