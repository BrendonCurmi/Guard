import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import FullView from "../../components/views/FullView";
import { decode, encode } from "../../utils/URLUtils";
import { useFolders } from "../../store/FolderProvider";

const API = "http://localhost:4000/api/folderView";

const Folder = () => {
    const { name } = useParams();
    const folderName = decode(name);

    const navigate = useNavigate();
    const folders = useFolders();

    const deleteFolderHandler = async () => {
        const rawResponse = await fetch(`http://localhost:4000/api/folder/`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ search: folderName })
        });

        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            // console.log(content);
            folders.loadFolders();
            navigate("/pass");
        }
    };

    return <FullView
        page={{
            title: folderName,
            actionTitle: "Delete Folder",
            action: deleteFolderHandler,
            timeName: "Last Used"
        }}
        confirm={{
            title: "Are you sure?",
            msg: "Do you really want to delete this? It can't be recovered once it's deleted"
        }}
        loadApi={`${API}?f=${encode(folderName)}`}
        loadDeps={[name]}
        deleteItem={deleteFolderHandler}/>;
};

export default Folder;
