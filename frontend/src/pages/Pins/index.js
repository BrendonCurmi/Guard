import React from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import FullView from "../../components/views/FullView";

const API = "http://localhost:4000/api/pins";

export const PinData = {
    fields: [
        {
            label: "Title",
            required: true,
            id: "input-title",
            value: "title"
        },
        {
            label: "Pins",
            secure: true,
            required: true,
            id: "input-pin",
            value: "pin"
        }
    ],
    endpoints: {
        loadApi: "http://localhost:4000/api/pins",
        createApi: "http://localhost:4000/api/pin",
        updateApi: val => `${PinData.endpoints}/${val}`,
        deleteApi: val => `${PinData.endpoints.createApi}/${val}`,
        credentialsApi: val => `${PinData.endpoints.createApi}/${val}/credentials`
    },
    copyField: creds => creds.pin
};

const Pins = () => {
    return <FullView
        page={{ title: "Pins", action: "Add Pin", timeName: "Last Seen" }}
        confirm={{
            title: "Are you sure?",
            msg: "Do you really want to delete this pin? It can't be recovered once it's deleted"
        }}
        dataType="pins"
        icon={faFolder}/>;
};

export default Pins;
