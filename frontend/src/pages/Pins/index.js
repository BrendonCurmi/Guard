import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import FullView from "../../components/views/FullView";

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
        createApi: "http://localhost:4000/api/pin",
        updateApi: val => `${PinData.endpoints.createApi}/${val}`,
        deleteApi: val => `${PinData.endpoints.createApi}/${val}`,
        credentialsApi: val => `${PinData.endpoints.createApi}/${val}/credentials`
    },
    copyField: creds => creds.pin,
    icon: () => <FontAwesomeIcon icon={faFolder}/>
};

const Pins = () => {
    return <FullView
        page={{ title: "Pins", actionTitle: "Add Pin", timeName: "Last Seen" }}
        confirm={{
            title: "Are you sure?",
            msg: "Do you really want to delete this pin? It will be moved to Trash"
        }}
        dataType="pins"/>;
};

export default Pins;
