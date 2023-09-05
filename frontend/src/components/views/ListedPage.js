import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

import ListedTable from "./ListedTable";
import CircleButton from "../buttons/CircleButton";

import classes from "./ListedTable.module.scss";

const ListedPage = ({ page, ...props }) => {
    const { title, actionTitle, action, actions, timeName, actionIcon = faAdd } = page;

    // Use optional action if page defined it, otherwise open empty focus modal
    const pageActionClickHandler = action ? action : () => {
        document.dispatchEvent(new CustomEvent("openFocusModal"));
    };

    const DefaultPageActions = () => {
        return (
            <CircleButton type="button"
                          color="secondary"
                          tooltip={actionTitle}
                          onClick={pageActionClickHandler}>
                <FontAwesomeIcon icon={actionIcon}/>
            </CircleButton>
        );
    };

    const PageActions = actions || DefaultPageActions;

    const actionsSection = (
        (actions !== undefined || actionTitle !== "") &&
        <div className={classes.pageActionBtns}>
            <PageActions/>
        </div>
    );

    return (
        <ListedTable head={["Title", "", timeName, "Actions"]} {...props}>
            <div className={classes.header}>
                <h1 className={classes.title}>{title}</h1>
                {actionsSection}
            </div>
        </ListedTable>
    );
};

export default ListedPage;
