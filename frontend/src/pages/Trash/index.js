import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import FullView from "../../components/views/FullView";
import CircleButton from "../../components/buttons/CircleButton";

const loadApi= "http://localhost:4000/api/trash"
const deleteApi = val => `${loadApi}/${val}`;
const restoreApi = val => `${loadApi}/${val}/restore`;

const Trash = () => {
    const createActionBtns = (item, reload) => {
        const restoreItem = async () => {
            const res = await fetch(restoreApi(item._id));
            const data = await res.json();
            const status = res.status;
            await reload();
        };
        return (
            <CircleButton tooltip="Restore" onClick={restoreItem} color="safe">
                <FontAwesomeIcon icon={faTrashRestore}/>
            </CircleButton>
        );
    };

    const clearTrash = () => {
        console.log("trash clear");//todo trash clear
    };

    return <FullView
        page={{
            title: "Trash",
            actionTitle: "Clear Trash",
            actionIcon: faTrashAlt,
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
            customActionBtns: createActionBtns
        }}
    />;
};

export default Trash;
