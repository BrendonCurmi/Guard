import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore } from "@fortawesome/free-solid-svg-icons";

import FullView from "../../components/views/FullView";

const loadApi= "http://localhost:4000/api/trash"
const deleteApi = val => `${loadApi}/${val}`;

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
            title: "Are you sure? This will be permanently deleted",
            msg: "This action cannot be reversed and item cannot be recovered"
        }}
        loadApi={loadApi}
        deleteApi={deleteApi}
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
