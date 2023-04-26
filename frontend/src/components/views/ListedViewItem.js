import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import { describeDate } from "../../utils/DateUtils";

import classes from "./ListedViewItem.module.scss";

const ListedViewItem = ({
                            dKey,
                            account,
                            icon,
                            onEditClickHandler,
                            onCopyClick,
                            setConfirming,
                            listedViewProps,
                            allowActions = true
                        }) => {
    const [isHovered, setIsHovered] = useState(false);

    listedViewProps = listedViewProps || {
        cells: {
            time: "lastAccess"
        },
        canCopy: true,
        canEdit: true,
        canDelete: true,
        customActionBtns: ""
    };

    const { cells, canCopy, canEdit, canDelete, customActionBtns } = listedViewProps;
    const { time } = cells;

    const key = dKey;// "key" cannot be a prop

    const onClick = () => {
        return canEdit && allowActions ? onEditClickHandler(key) : "";
    };

    const DefaultActionBtns = () => {
        const copyBtn =
            <button onClick={() => onCopyClick(key)}>
                <FontAwesomeIcon icon={faCopy}/>
            </button>;

        const editBtn =
            <button onClick={onClick}>
                <FontAwesomeIcon icon={faPencil}/>
            </button>;

        const deleteBtn =
            <button onClick={() => setConfirming(key)} className={classes.danger}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>;
        return (
            <>
                {customActionBtns}
                {canCopy && copyBtn}
                {canEdit && editBtn}
                {canDelete && deleteBtn}
            </>
        );
    };

    const actionBtns = <DefaultActionBtns/>;
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
            <td>{isHovered && allowActions && actionBtns}</td>
        </tr>
    );
};

export default ListedViewItem;
