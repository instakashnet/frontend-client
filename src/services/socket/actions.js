import * as types from "./types";

export const openSocketConnection = () => ({
  type: types.CONNECT_WEBSOCKET,
});

export const closeSocketConnection = () => ({
  type: types.CLOSE_WEBSOCKET,
});
