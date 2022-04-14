import { exchangeService } from "../axios";

// WITHDRAW KASH
export const withdrawKashSvc = async (values) => {
  try {
    const response = await exchangeService.post("/withdrawals/user", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
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

// DELETE EXCHANGE
export const cancelExchangeSvc = async (URL) => {
  try {
    const response = await exchangeService.delete(URL);
    if (response.status >= 400) throw new Error(response.errors[0]);
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