import * as types from "./types";

export const openSocketConnection = (service) => ({
  type: types.CONNECT_WEBSOCKET,
  service,
});

export const closeSocketConnection = () => ({
  type: types.CLOSE_WEBSOCKET,
});
