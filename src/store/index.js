import { applyMiddleware, compose,createStore } from "redux";
import logger from "redux-logger";
import createSaga from "redux-saga";

import rootReducer from "./reducer";
import rootSaga from "./saga";

const composeEnhancers = (process.env.NODE_ENV !== "production" && typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {};
const sagaMiddleware = createSaga();
const middlewares = [sagaMiddleware];

if (process.env.STAGE === "dev") middlewares.push(logger);

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;
