import React from "react";
import SiteIcon from "../../components/SiteIcon";
import ListedPage from "../../components/listed/ListedPage";
import { API } from "../../utils/API";

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
        },
        {
            value: "evaluator",
            id: "pw"
        },
        {
            label: "Folders",
            id: "input-folders",
            value: "folders"
        }
    ],
    listDisplay: {
        title: item => item.title,
        subtitle: item => item.identity ? item.identity : ""
    },
    endpoints: {
        createApi: API + "/account",
        updateApi: val => `${PasswordData.endpoints.createApi}/${val}`,
        deleteApi: val => `${PasswordData.endpoints.createApi}/${val}`,
        credentialsApi: val => `${PasswordData.endpoints.createApi}/${val}/credentials`
    },
    copyField: creds => creds.pw,
    icon: site => <SiteIcon domain={site} size="32"/>
}

const Passwords = () => {
    return <ListedPage
        page={{ title: "Passwords", actionTitle: "Add Item", timeName: "Last Used" }}
        dataType="accounts"/>;
};

export default Passwords;
