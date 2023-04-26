import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import useIcon from "../../hooks/use-icon";

import { describeDate } from "../../utils/DateUtils";

import classes from "./ListedViewItem.module.scss";

const ListedViewItem = ({ dKey, account, icon, onEditClickHandler, onCopyClick, setConfirming }) => {
    const [isHovered, setIsHovered] = useState(false);

    const key = dKey;// "key" cannot be a prop
    const focusedIcon = useIcon(icon, account.site);
    return (
        <tr key={account.title}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <td onClick={() => onEditClickHandler(key)}>
                {focusedIcon}
            </td>
            <td onClick={() => onEditClickHandler(key)}>
                <p className={classes.accountTitle}>{account.title}</p>
                <p className={classes.accountSubtitle}>{account.identity ? account.identity : ""}</p>
            </td>
            <td onClick={() => onEditClickHandler(key)}>{describeDate(account.lastAccess)}</td>
            <td>
                {isHovered && <>
                    <button onClick={() => onCopyClick(key)}>
                        <FontAwesomeIcon icon={faCopy}/>
                    </button>
                    <button onClick={() => onEditClickHandler(key)}>
                        <FontAwesomeIcon icon={faPencil}/>
                    </button>
                    <button onClick={() => setConfirming(key)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </>}
            </td>
        </tr>
    );
};

export default ListedViewItem;
