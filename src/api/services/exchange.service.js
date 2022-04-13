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

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// VALIDATE COUPON
export const validateCouponSvc = async (couponName, profileType) => {
  try {
    const response = await exchangeService.get(`/coupons/${couponName}/${profileType}`);
    console.log("Nombre de cupón:", couponName, "Tipo de perfil:", profileType);
    console.log("validateCouponSvc RESPONSE:", response);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};