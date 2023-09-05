import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import ListedPage from "../../components/listed/ListedPage";
import CircleButton from "../../components/buttons/CircleButton";

const deleteApi = val => `http://localhost:4000/api/trash/${val}`;
const restoreApi = val => `http://localhost:4000/api/trash/${val}/restore`;

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

    return <ListedPage
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
        dataType="trash"
        deleteApi={deleteApi}
        listedViewProps={{
            cells: { timeField: "deletedDate" },
            canCopy: false,
            canEdit: false,
            canDelete: true,
            customActionBtns: createActionBtns
        }}
    />;
};

export default Trash;
