import React from "react";
import "./styles.css";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import TableContainer from "./containers/tableContainer";
import store from "./store";


const App = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
            <Switch>
              <Route exact path='/' component={TableContainer} />
            </Switch>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
