import React from "react";
import "./styles.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomeContainer from "./containers/HomeContainer";
import SelectedRowDetails from "./components/selectedrowdetail/SelectedRowDetail";
import store from "./store";

// import { addLocaleData } from "react-intl";
// import locale_en from 'react-intl/locale-data/en';
// import locale_de from 'react-intl/locale-data/de';

// addLocaleData([...locale_en, ...locale_de]);



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
