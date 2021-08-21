import * as types from "./types";

export const getAffiliatesInit = () => ({
  type: types.GET_AFFILIATES_INIT,
});

export const getAffiliatesSuccess = (affiliates) => ({
  type: types.GET_AFFILIATES_SUCCESS,
  affiliates,
});

export const affiliatesError = () => ({
  type: types.AFFILIATES_ERROR,
});
