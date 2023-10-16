import axiosMiddleware from "redux-axios-middleware";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers/RootReducer";
import HttpService from "app/services/HttpService";
import createSagaMiddleware from 'redux-saga';
import logger from "redux-logger";
import { RootSaga } from "./saga/RootSaga";
const initialState = {};

//const middlewares = [thunk];
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  thunk,
  //routerMiddleware(browserHistory),
  axiosMiddleware(HttpService.getAxiosClient()),
  sagaMiddleware,
  logger
];
export const Store = createStore(
  RootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares)
    // applyMiddleware(...middlewares),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
sagaMiddleware.run(RootSaga);