import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEye, faEyeSlash, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import SiteIcon from "../SiteIcon";

import { describeDate } from "../../utils/DateUtils";

import classes from "../../pages/Passwords/index.module.scss";

const ListedViewItem = ({ dKey, account, onEditClickHandler, onCopyClick, onShowClick, setConfirming }) => {
    const key = dKey;// "key" cannot be a prop
    return (
        <tr key={account.title}>
            <td onClick={() => onEditClickHandler(key)}>
                <SiteIcon domain={account.site} size="32"/>
            </td>
            <td onClick={() => onEditClickHandler(key)}>
                <p className={classes.accountTitle}>{account.title}</p>
                {/*<p>{product.email || product.username}</p>*/}
                <p className={classes.accountSubtitle}>Test</p>
            </td>
            <td onClick={() => onEditClickHandler(key)}>{describeDate(account.lastUsed)}</td>
            <td>
                <button onClick={() => onCopyClick(key)}>
                    <FontAwesomeIcon icon={faCopy}/>
                </button>
                {/*<button onClick={() => onShowClick(key)}>
                    <FontAwesomeIcon icon={account.editing ? faEyeSlash : faEye}/>
                </button>*/}
                <button onClick={() => onEditClickHandler(key)}>
                    <FontAwesomeIcon icon={faPencil}/>
                </button>
                <button onClick={() => setConfirming(key)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </td>
        </tr>
    );
};

export default ListedViewItem;
