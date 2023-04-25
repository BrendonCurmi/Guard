import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/AuthProvider";
import FolderProvider from "./store/FolderProvider";

import "./index.module.scss";

ReactDOM.render(
    <AuthProvider>
        <FolderProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </FolderProvider>
    </AuthProvider>,
    document.getElementById("app"));
