import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

import FullView from "../../components/views/FullView";
import CircleButton from "../../components/buttons/CircleButton";
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

    const ViewActionBtns = () => {
        //todo
        return <>
            <CircleButton color="secondary"
                          tooltip="Rename"
                          onClick={() => console.log}>
                <FontAwesomeIcon icon={faPencil}/>
            </CircleButton>
            <CircleButton color="secondary"
                          tooltip="Delete"
                          onClick={() => console.log}>
                <FontAwesomeIcon icon={faTrash}/>
            </CircleButton>
        </>;
    };

    //todo test what happens when deleting from folder
    return <FullView
        page={{
            title: folderName,
            actionTitle: "Delete Folder",
            action: deleteFolderHandler,
            actions: ViewActionBtns,
            timeName: "Last Used"
        }}
        confirm={{
            title: "Are you sure?",
            msg: "Do you really want to delete this? It can't be recovered once it's deleted"
        }}
        loadApi={`${API}?f=${encode(folderName)}`}
        loadDeps={[name]}/>;
};

export default Folder;
