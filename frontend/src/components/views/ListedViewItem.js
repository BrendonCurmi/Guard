import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import CircleButton from "../buttons/CircleButton";
import { describeDate } from "../../utils/DateUtils";

import classes from "./ListedViewItem.module.scss";

const ListedViewItem = ({
                            dKey,
                            account,
                            icon,
                            reload,
                            onEditClickHandler,
                            onCopyClickHandler,
                            setConfirming,
                            listedViewProps = {},
                            allowActions = true
                        }) => {
    const [isHovered, setIsHovered] = useState(false);

    const { cells = {}, canCopy = true, canEdit = true, canDelete = true, customActionBtns = () => {} } = listedViewProps;
    const { time = "lastAccess" } = cells;

    const key = dKey;// "key" cannot be a prop

    const onClick = () => {
        return canEdit && allowActions ? onEditClickHandler(key) : "";
    };

    const DefaultActionBtns = () => {
        const copyBtn =
            <CircleButton tooltip="Copy" onClick={() => onCopyClickHandler(key)}>
                <FontAwesomeIcon icon={faCopy}/>
            </CircleButton>;

        const editBtn =
            <CircleButton tooltip="Edit" onClick={onClick}>
                <FontAwesomeIcon icon={faPencil}/>
            </CircleButton>;

        const deleteBtn =
            <CircleButton tooltip="Delete" onClick={() => setConfirming(key)} color="danger">
                <FontAwesomeIcon icon={faTrash}/>
            </CircleButton>;
        return (
            <>
                {customActionBtns(account, reload)}
                {canCopy && copyBtn}
                {canEdit && editBtn}
                {canDelete && deleteBtn}
            </>
        );
    };

    return (
        <tr key={account.title}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <td onClick={onClick}>
                {icon}
            </td>
            <td onClick={onClick}>
                <p className={classes.accountTitle}>{account.title}</p>
                <p className={classes.accountSubtitle}>{account.identity ? account.identity : ""}</p>
            </td>
            <td onClick={onClick}>{describeDate(account[time])}</td>
            <td>{isHovered && allowActions && <DefaultActionBtns/>}</td>
        </tr>
    );
};

export default ListedViewItem;
