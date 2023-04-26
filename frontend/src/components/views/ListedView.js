import React from "react";

import classes from "./ListedView.module.scss";

const API = "http://localhost:4000/api/accounts";

const ListedView = ({ children, shade, pageTitle, pageAction, pageActionClick, popups, timeName }) => {
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
            <div className={classes.contentWrapper}>
                {shade &&
                    <div className={classes.shade}></div>
                }
                <h1 className={classes.title}>{pageTitle}</h1>
                <a className={classes.button}
                   onClick={pageActionClick}>{pageAction}</a>
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
