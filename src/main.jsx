import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store.jsx";
import { login } from "./features/auth/authSlice.jsx";

const token = localStorage.getItem("token");
if (token) {
  store.dispatch(login(token));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* <Routes> */}
        {/* <Route path="/*" element={<App />} /> */}
        {/* </Routes> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
