import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRoutereeee } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoutes from "./routes/PrivateRoutes";
import MyContextProvider from "./utilities/MyContext";
import Noteeeeificationeewwwwe from "./utilities/Noteeeeificationeewwwwe";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <BrowserRoutereeee>
      <MyContextProvider>
        <Noteeeeificationeewwwwe />
        <PrivateRoutes />
      </MyContextProvider>
    </BrowserRoutereeee>
  </ChakraProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
