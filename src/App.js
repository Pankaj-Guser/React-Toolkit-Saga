import React from "react";
import "./styles.css";
import { IntlProvider } from "react-intl"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomeContainer from "./containers/HomeContainer";
import SelectedRowDetails from "./components/selectedrowdetail/SelectedRowDetail";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <IntlProvider locale="en">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/selectedKnowledgebasisDetail" component={SelectedRowDetails} />
        </Switch>
      </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};

export default App;
