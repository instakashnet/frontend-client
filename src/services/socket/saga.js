import { END, eventChannel } from "redux-saga";
import { call, fork, take, takeEvery, cancel, select, cancelled, put } from "redux-saga/effects";
import * as types from "./types";
import { SET_USER_DATA } from "../auth/types";

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
        let message;

        try {
          message = JSON.parse(event.data);
        } catch (error) {
          console.log("Error parsing: ", event.data);
        }

        if (message) return emit(message);
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

    while (true) {
      const action = yield take(socketChannel);

      switch (action.type) {
        case "validation":
          let user = yield select((state) => state.Auth.user);
          console.log(action.data);
          user = { ...user, identityDocumentValidation: action.data.status, level: action.data.level };
          yield put({ type: SET_USER_DATA, user });
          break;
        default:
          break;
      }
    }
  } catch (error) {
    console.log("Error connecting.. " + error);
  } finally {
    if (yield cancelled()) socketChannel.close();
  }
}

function* connectToSocketSaga({ service }) {
  const token = yield select((state) => state.Auth.token),
    socket = yield fork(listeningSocketSaga, token, service);

  // WHEN CLOSE IS CALLED CANCEL AND CLOSE SOCKET
  yield take(types.CLOSE_WEBSOCKET);
  yield cancel(socket);
}

export function* socketSaga() {
  yield takeEvery(types.CONNECT_WEBSOCKET, connectToSocketSaga);
}
