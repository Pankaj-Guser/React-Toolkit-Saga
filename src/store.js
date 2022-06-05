import {
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import TODODataReducer from "./Features/TODODataReducer";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";

// let sagaMiddleware = createSagaMiddleware();
// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

// const store = configureStore({
//   reducer: {
//     todoReducer: rootReducer,
//   },
//   middleware
// });

    

let middleware = [];

const sagaMiddleware = createSagaMiddleware();


middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const store = configureStore({ 
  reducer: {
    todo: TODODataReducer.reducer,
  },
  middleware
})

sagaMiddleware.run(saga);


export default store;
