import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import App from "./App";
import Spanish from "./translations/es-MX.json";
import English from "./translations/en-US.json";

const locale = navigator.language;
let lang;
if (locale === "en-IN") {
  lang = English;
} else {
  lang = Spanish;
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={lang}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  rootElement
);
