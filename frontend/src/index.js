import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/AuthProvider";

import "./index.module.scss";

fetch("http://localhost:4000/csrf-token", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors"
}).then(res => res.json())
    .then(res=> {
        const data = res.csrfToken;
        console.log(data);
        document.querySelector("meta[name='csrf-token']").content = data;
    })
    .catch(console.log);

ReactDOM.render(
    <AuthProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </AuthProvider>,
    document.getElementById("app"));
