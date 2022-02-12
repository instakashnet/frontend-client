import { END, eventChannel } from "redux-saga";
import { call, fork, take, takeEvery, cancel, cancelled } from "redux-saga/effects";
import * as types from "./types";

let ws;

const createWebsocketChannel = (token, service) =>
  eventChannel((emit) => {
    const connectToWs = () => {
      ws = new WebSocket(`${process.env.REACT_APP_STAGE === "prod" ? process.env.REACT_APP_WS_URL : process.env.REACT_APP_WS_DEV_URL}/ws?token=${token}&service=${service}`);

      ws.onopen = () => {
        console.log("Connection opened.");
      };

      ws.onerror = (error) => {
        console.log("error in the connection: " + error);
      };

      ws.onmessage = (event) => {
        console.log(event);
      };

      ws.onclose = (e) => {
        if (e.code === 1005) {
          console.log("Connection closed.");
          emit(END);
        } else {
          console.log("The connection has closed unexpectedly. Reconnect try in 5 seconds.", e.reason);
          setTimeout(() => {
            connectToWs();
          }, 5000);
        }
      };
    };
    connectToWs();

    return () => {
      ws.onmessage = null;
      console.log("Closing connection.");
      ws.close();
    };
  });

function* listeningSocketSaga(...args) {
  let socketChannel;

  try {
    socketChannel = yield call(createWebsocketChannel, ...args);
    console.log(socketChannel);
  } catch (error) {
    console.log("Error connecting.. " + error);
  } finally {
    if (yield cancelled()) socketChannel.close();
  }
  // while (true) {

  // }
}

function* connectToSocketSaga({ service }) {
  const authData = yield call([localStorage, "getItem"], "authData");
  const token = JSON.parse(authData).token;

  console.log(service);

  const socket = yield fork(listeningSocketSaga, token, service);

  // WHEN CLOSE IS CALLED CANCEL AND CLOSE SOCKET
  yield take(types.CLOSE_WEBSOCKET);
  yield cancel(socket);
}

export function* socketSaga() {
  yield takeEvery(types.CONNECT_WEBSOCKET, connectToSocketSaga);
}
