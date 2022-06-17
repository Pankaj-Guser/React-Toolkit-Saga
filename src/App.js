import React from "react";
import "./styles.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomeContainer from "./containers/HomeContainer";
import SelectedRowDetails from "./components/SelectedRowDetail";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/selectedKnowledgebasisDetail" component={SelectedRowDetails} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
