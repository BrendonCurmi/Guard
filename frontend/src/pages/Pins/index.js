import React from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import FullView from "../../components/views/FullView";

const API = "http://localhost:4000/api/pins";

const Pins = () => {
    const fields = [
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
    ];

    return <FullView
        loadApi={API}
        createApi="http://localhost:4000/api/pin"
        copy={creds => creds.pin}
        page={{ title: "Pins", action: "Add Pin", timeName: "Last Seen" }}
        confirm={{
            title: "Are you sure?",
            msg: "Do you really want to delete this pin? It can't be recovered once it's deleted"
        }}
        fields={fields}
        icon={faFolder}/>;
};

export default Pins;
