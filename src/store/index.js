import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import createSaga from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootSaga from "./saga";

const initialState = {};
const sagaMiddleware = createSaga();
const middlewares = [sagaMiddleware];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;
