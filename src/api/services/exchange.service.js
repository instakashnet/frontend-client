import { exchangeService } from "../axios";

// GET SCHEDULES
export const getSchedulesSvc = async () => {
  try {
    const response = await exchangeService.get("/schedules");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET RATES
export const getRatesSvc = async () => {
  try {
    const response = await exchangeService.get("/rates");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data[0];
  } catch (error) {
    throw new Error(error);
  }
};

// GET ORDERS
export const getOrdersSvc = async (limit, enabled) => {
  try {
    const response = await exchangeService.get(`/order/user?enabled=${enabled}&limit=${limit}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET LAST ORDER
export const getLastOrderSvc = async () => {
  try {
    const response = await exchangeService.get("/order/last-order");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data["last_order"];
  } catch (error) {
    throw new Error(error);
  }
};

// GET WITHDRAWALS
export const getWithdrawalsSvc = async () => {
  try {
    const response = await exchangeService.get("/withdrawals/user?limit=5");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET ORDER AMOUNTS
export const getOrderAmountsSvc = async () => {
  try {
    const response = await exchangeService.get("/order/data/total-processed/user");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET TOTAL AMOUNT
export const getTotalAmountSvc = async () => {
  try {
    const response = await exchangeService.get("/order/data/user");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET ORDER DETAILS
export const getOrderDetailsSvc = async (id, detailsType) => {
  try {
    const response = await exchangeService.get(`/order/detail/${id}?type=${detailsType}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// VALIDATE COUPON
export const validateCouponSvc = async (couponName, profileType) => {
  try {
    const response = await exchangeService.get(`/coupons/${couponName}/${profileType}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// WITHDRAW KASH
export const withdrawKashSvc = async (values) => {
  try {
    const response = await exchangeService.post("/withdrawals/user", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};

// CREATE EXCHANGE
export const createExchangeSvc = async (exchangeValues) => {
  try {
    const response = await exchangeService.post("/order/step-2", exchangeValues);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// COMPLETE EXCHANGE
export const completeExchangeSvc = async (orderId, exchangeValues) => {
  try {
    const response = await exchangeService.put(`/order/step-3/${orderId}`, exchangeValues);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// PROCESS CODE
export const processCodeSvc = async (orderId, processValue) => {
  try {
    const response = await exchangeService.put(`/order/step-4/${orderId}`, processValue);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};

// DELETE EXCHANGE
export const cancelExchangeSvc = async (URL) => {
  try {
    const response = await exchangeService.delete(URL);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};
