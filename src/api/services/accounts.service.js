import { accountsService } from "../axios";

// GET BANKS
export const getBanks = async () => {
  try {
    const response = await accountsService.get("/banks/172");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET CURRENCIES
export const getCurrencies = async () => {
  try {
    const response = await accountsService.get("/currencies/country/172");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET ACCOUNTS
export const getAccounts = async (type) => {
  try {
    const response = await accountsService.get(`/accounts?type=${type}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
