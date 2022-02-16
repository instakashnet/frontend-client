import * as types from "./types";

export const getScheduleInit = () => ({
  type: types.GET_SCHEDULE_INIT,
});

export const getScheduleSuccess = (schedule) => ({
  type: types.GET_SCHEDULE_SUCCESS,
  schedule,
});

export const dataError = () => ({
  type: types.DATA_ERROR,
});
