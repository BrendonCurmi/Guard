import React from "react";
import FullView from "../../components/views/FullView";
import SiteIcon from "../../components/SiteIcon";

export const PasswordData = {
    fields: [
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
            id: "input-identity",
            value: "identity"
        },
        {
            label: "Password",
            secure: true,
            required: true,
            id: "input-pw",
            value: "pw"
        }
    ],
    endpoints: {
        createApi: "http://localhost:4000/api/account",
        updateApi: val => `${PasswordData.endpoints.createApi}/${val}`,
        deleteApi: val => `${PasswordData.endpoints.createApi}/${val}`,
        credentialsApi: val => `${PasswordData.endpoints.createApi}/${val}/credentials`
    },
    copyField: creds => creds.pw,
    icon: site => <SiteIcon domain={site} size="32"/>
}

const Passwords = () => {
    return <FullView
        page={{ title: "Passwords", actionTitle: "Add Item", timeName: "Last Used" }}
        confirm={{
            title: "Are you sure?",
            msg: "Do you really want to delete this account? It will be moved to Trash"
        }}
        dataType="accounts"/>;
};

export default Passwords;
