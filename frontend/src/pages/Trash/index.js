import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore } from "@fortawesome/free-solid-svg-icons";

import FullView from "../../components/views/FullView";

const API = "http://localhost:4000/api/trash";

const Trash = () => {
    const ActionBtns = () => {
        return (
            <button onClick={() => console.log("todo")}>
                <FontAwesomeIcon icon={faTrashRestore}/>
            </button>
        );
    };

    const clearTrash = () => {
        console.log("trash clear");//todo trash clear
    };

    return <FullView
        page={{
            title: "Trash",
            actionTitle: "Clear Trash",
            action: clearTrash,
            timeName: "Date Deleted"
        }}
        confirm={{
            title: "Are you sure you want to permanently delete this?",
            msg: "This cannot be recovered once deleted"
        }}
        loadApi={API}
        deleteItemHandler={() => console.log("todo")}
        listedViewProps={{
            cells: { time: "deletedDate" },
            canCopy: false,
            canEdit: false,
            canDelete: true,
            customActionBtns: <ActionBtns/>
        }}
    />;
};

export default Trash;
