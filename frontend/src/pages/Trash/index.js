import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import ListedPage from "../../components/listed/ListedPage";
import CircleButton from "../../components/buttons/CircleButton";

import { API } from "../../utils/API";

const deleteApi = val => `${API}/trash/${val}`;
const restoreApi = val => `${API}/trash/${val}/restore`;

const Trash = () => {
    const createActionBtns = (item, reload) => {
        const restoreItem = async () => {
            await fetch(restoreApi(item._id));
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
