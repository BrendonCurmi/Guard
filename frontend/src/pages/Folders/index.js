import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import FullView from "../../components/views/FullView";

export const FolderData = {
    fields: [
        {
            label: "Name",
            required: true,
            id: "input-name",
            value: "name"
        }
    ],
    endpoints: {
        createApi: "http://localhost:4000/api/note",
        updateApi: val => `${FolderData.endpoints.createApi}/${val}`,
        deleteApi: val => `${FolderData.endpoints.createApi}/${val}`,
        credentialsApi: val => `${FolderData.endpoints.createApi}/${val}/credentials`
    },
    copyField: creds => creds.note,
    icon: () => <FontAwesomeIcon icon={faFolder}/>
}

const Folders = () => {
    // todo remove folders section
    return <FullView
        page={{ title: "Folders", actionTitle: "Add Folder" }}
        confirm={{
            title: "Are you sure?",
            msg: "Do you really want to delete this folder? It cannot be recovered"
        }}
        dataType="folders"
        listedViewProps={{
            canCopy: false
        }}/>;
};

export default Folders;
