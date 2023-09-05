import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import ListedPage from "../../components/listed/ListedPage";
import { API } from "../../utils/API";

export const FolderData = {
    fields: [
        {
            label: "Name",
            required: true,
            id: "input-name",
            value: "name"
        }
    ],
    listDisplay: {
        title: item => item.name,
        subtitle: () => "",
        time: ""
    },
    endpoints: {
        createApi: API + "/folder",
        updateApi: val => `${FolderData.endpoints.createApi}/${val}`,
        deleteApi: val => `${FolderData.endpoints.createApi}/${val}`
    },
    copyField: creds => creds.note,
    icon: () => <FontAwesomeIcon icon={faFolder}/>
}

const Folders = () => {
    return <ListedPage
        page={{ title: "Folders", actionTitle: "Add Folder" }}
        confirm={{
            msg: "Do you really want to delete this folder? It cannot be recovered"
        }}
        dataType="folders"
        listedViewProps={{
            canCopy: false
        }}/>;
};

export default Folders;
