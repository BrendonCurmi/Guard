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
        dataType="accounts"/>;
};

export default Passwords;
