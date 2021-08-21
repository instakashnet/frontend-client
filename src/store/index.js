import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import createSaga from "redux-saga";
import rootSaga from "./saga";

const composeEnhancers = (process.env.NODE_ENV !== "production" && typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {};
const sagaMiddleware = createSaga();
const middlewares = [sagaMiddleware];
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;
