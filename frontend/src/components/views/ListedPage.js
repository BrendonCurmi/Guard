import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

import ListedTable from "./ListedTable";
import CircleButton from "../buttons/CircleButton";

import classes from "./ListedTable.module.scss";

/**
 * Displays a page with a list of items.
 * @param page the page properties, including title,
 * title of the action button, name of the time section,
 * action to perform when clicking button, and action
 * buttons override.
 * @param props element props.
 * @returns {JSX.Element}
 */
const ListedPage = ({ page = { title: "", actionTitle: "", timeName: "", action: "", actions: "" }, ...props }) => {
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
