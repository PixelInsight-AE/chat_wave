import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        {/* <Provider store={store}> */}
        <App />
        {/* </Provider> */}
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
