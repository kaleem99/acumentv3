import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../redux";
import App from "./components/App";
/* global document, Office, module, require */


const title = "Contoso Task Pane Add-in";

const rootElement = document.getElementById("container");
const root = createRoot(rootElement);

/* Render application after Office initializes */
Office.onReady(async () => {
  // const contextualTabJSON = ` ... `; // Assign the JSON string.
  // const contextualTab = JSON.parse(contextualTabJSON);
  // await Office.ribbon.requestCreateControls(contextualTab);

  // await Excel.run((context) => {
  //   const charts = context.workbook.worksheets.getActiveWorksheet().charts;
  //   charts.onActivated.add("showDataTab");
  //   charts.onDeactivated.add("hideDataTab");
  //   return context.sync();
  // });
  root.render(
    <FluentProvider theme={webLightTheme}>
      <Provider store={store}>
        <App title={title} />
      </Provider>
    </FluentProvider>
  );
});

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root.render(NextApp);
  });
}
