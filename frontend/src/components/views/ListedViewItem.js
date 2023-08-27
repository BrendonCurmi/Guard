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
                            allowActions = true,
                            display = { title: () => "", subtitle: () => "", time: "" }
                        }) => {
    const [isHovered, setIsHovered] = useState(false);

    const { cells = {}, canCopy = true, canEdit = true, canDelete = true, customActionBtns = () => {} } = listedViewProps;
    const { timeField = "lastAccess" } = cells;

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

    const { title = () => "", subtitle = () => "", time = describeDate(account[timeField]) } = display;

    return (
        <tr key={title(account)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <td onClick={onClick}>
                {icon}
            </td>
            <td onClick={onClick}>
                <p className={classes.accountTitle}>{title(account)}</p>
                <p className={classes.accountSubtitle}>{subtitle(account)}</p>
            </td>
            <td onClick={onClick}>{time}</td>
            <td>{isHovered && allowActions && <DefaultActionBtns/>}</td>
        </tr>
    );
};

export default ListedViewItem;
