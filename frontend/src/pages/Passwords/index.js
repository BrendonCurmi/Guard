import React from "react";
import FullView from "../../components/views/FullView";

import classes from "./index.module.scss";

const API = "http://localhost:4000/api/accounts";

const Passwords = () => {
    const fields = [
        {
            label: "Title",
            required: true,
            id: "input-title",
            value: "title"
        },
        {
            label: "Website Address",
            required: true,
            id: "input-site",
            value: "site"
        },
        "Login Details",
        {
            label: "Email or username",
            id: "input-email",
            value: "email"
        },
        {
            label: "Password",
            secure: true,
            required: true,
            id: "input-pw",
            value: "pw"
        }
    ];

    return <FullView
        loadApi={API}
        createApi="http://localhost:4000/api/account"
        copy={creds => creds.pw}
        page={{ title: "Passwords", action: "Add Item", timeName: "Last Used" }}
        confirm={{
            title: "Are you sure?",
            msg: "Do you really want to delete this account? It can't be recovered once it's deleted"
        }}
        fields={fields}/>;
};

export default Passwords;
