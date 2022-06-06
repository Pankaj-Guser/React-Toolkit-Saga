import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware from "redux-saga";
import saga from "./saga";  

let middleware = [];

const sagaMiddleware = createSagaMiddleware();

const storeData = {}
middleware.push(sagaMiddleware);
const store = applyMiddleware(...middleware)(createStore)(
  rootReducer,
  storeData
  );

sagaMiddleware.run(saga);


export default store;
