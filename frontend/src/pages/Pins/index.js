import React from "react";
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
        createApi={"http://localhost:4000/api/pin"}
        // updateApi={val => `http://localhost:4000/api/pin/${val}`}
        // credentialsApi={val => `http://localhost:4000/api/pin/${val}/credentials`}
        copy={creds => creds.pin}

        confirmTitle="Are you sure?"
        confirmMsg="Do you really want to delete this account? It can't be recovered once it's deleted"


        pageTitle="Pins"
        pageAction="Add Pin"
        timeName=""
        fields={fields}
    />;
};

export default Pins;
