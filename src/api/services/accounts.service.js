import { accountsService } from "../axios";

// GET BANKS
export const getBanks = async () => {
  try {
    const response = await accountsService.get("/banks/172");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.banks;
  } catch (error) {
    throw new Error(error);
  }
};

// GET CURRENCIES
export const getCurrencies = async () => {
  try {
    const response = await accountsService.get("/currencies/country/172");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.currencies;
  } catch (error) {
    throw new Error(error);
  }
};

// GET ACCOUNTS
export const getAccounts = async (type) => {
  try {
    const response = await accountsService.get(`/accounts?type=${type}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accounts;
  } catch (error) {
    throw new Error(error);
  }
};

// ADD ACCOUNT
export const addAccountSvc = async (values) => {
  try {
    const response = await accountsService.post("/accounts", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};

// EDIT ACCOUNT
export const editAccountSvc = async (id, values) => {
  try {
    const response = await accountsService.put(`/accounts/${id}`, values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};

// DELETE ACCOUNT
export const deleteAccountSvc = async (id) => await accountsService.delete(`/accounts/${id}`);