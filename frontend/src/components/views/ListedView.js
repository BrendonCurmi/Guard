import React from "react";

import classes from "./ListedView.module.scss";

const API = "http://localhost:4000/api/accounts";

const ListedView = ({ children, shade, pageTitle, popups, timeName, PageActions }) => {
    const changeOrder = (field) => {
        // setAccounts(prevState => {
        //     // console.log(accounts.sort((a, b) => (new Date(a) - new Date(b))));
        //     // accounts.sort((a, b) => (new Date(a) - new Date(b)));
        // });

        // console.log("hh", field.target);
    };

    return (
        <div className={classes.wrapper}>
            {popups}
            <div className={`${classes.contentWrapper} ${shade ? classes.shade : ""}`}>
                <div className={classes.header}>
                    <h1 className={classes.title}>{pageTitle}</h1>
                    <div className={classes.pageActionBtns}>
                        <PageActions/>
                    </div>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th width="1%">Title</th>
                        <th width="34%"></th>
                        <th width="30%">
                            <a onClick={changeOrder}>{timeName}</a>
                        </th>
                        <th width="35%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListedView;
