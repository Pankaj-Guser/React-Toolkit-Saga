import React from "react";
import "./styles.css";
import { Provider } from "react-redux";
import ListTodo from "./ListTodo";
import store from "./store";

console.log(store.getState());

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <ListTodo />
      </div>
    </Provider>
  );
}
