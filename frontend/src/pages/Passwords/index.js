import React, { useEffect, useState } from "react";

import AccountView from "../../components/passwords/AccountView";
import Confirm from "../../components/confirm/Confirm";
import ListedView from "../../components/views/ListedView";
import ListedViewItem from "../../components/views/ListedViewItem";

import { copyToClipboard } from "../../utils/CopyUtils";

import classes from "./index.module.scss";

const API = "http://localhost:4000/api/accounts";

const Passwords = () => {
    const [accounts, setAccounts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [focusAccount, setFocusAccount] = useState();
    const [confirming, setConfirming] = useState(null);

    const submitAccountRequest = async (data) => {
        // console.log("data", data);
        const rawResponse = await (focusAccount ? callUpdateAccount(focusAccount._id, data) : callCreateAccount(data));
        if (rawResponse.status === 201 || rawResponse.status === 204) {
            // const content = await rawResponse.json();
            await getAccounts();
            switchAccountViewHandler();
        }
    };

    const callCreateAccount = (data) => {
        return send("http://localhost:4000/api/test", "POST", data);
    };

    const callUpdateAccount = (id, data) => {
        return send(`http://localhost:4000/api/account/${id}`, "PUT", data);
    };

    const send = (url, method, data) => {
        return fetch(url, {
            method: method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    };

    // Load accounts after loading component
    useEffect(() => {
        getAccounts();
    }, []);

    /**
     * Get accounts.
     */
    const getAccounts = async () => {
        const res = await fetch(API);
        const accountData = await res.json();
        console.log("API REQUEST SHOULD BE DONE ONCE")
        setAccounts(accountData);
    };


    const switchAccountViewHandler = () => {
        setIsEditing(prevState => !prevState);
        setFocusAccount(null);
    };


    const deleteAccountOnConfirmationHandler = async () => {
        if (confirming === null) return;
        const rawResponse = await fetch(`http://localhost:4000/api/account/${accounts[confirming]._id}`, {
            method: "DELETE"
        });

        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            // console.log(content);
            await getAccounts();
            setConfirming(null);
        }
    };


    const onEditClickHandler = (key) => {
        setFocusAccount(accounts[key]);
        setIsEditing(true);
    };

    const onCopyClick = async (key) => {
        const creds = await getCreds(accounts[key]._id);
        // console.log(creds.pw);
        copyToClipboard(creds.pw);
    };

    const onShowClick = (key) => {
        setAccounts(prevState => {
            prevState[key].editing = !prevState[key].editing;
            return [...prevState];
        });

        // accounts[key].editing = !accounts[key].editing
        // setAccounts([...accounts]);
    };

    const getCreds = async (id) => {
        const res = await fetch(`http://localhost:4000/api/account/${id}/credentials`);
        return await res.json();
    };

    const Popups = () => {
        return (
            <>
                {isEditing &&
                    <div className={classes.viewWrapper}>
                        <AccountView onClick={switchAccountViewHandler}
                                     focus={focusAccount}
                                     submitAccountRequest={submitAccountRequest}
                                     getCreds={getCreds}
                        />
                    </div>}
                {confirming !== null &&
                    <Confirm className={classes.viewWrapper}
                             onCancel={() => setConfirming(null)}
                             onConfirm={deleteAccountOnConfirmationHandler}>
                        <h2>Are you sure?</h2>
                        <h4>Do you really want to delete this account? It can't be recovered once it's deleted</h4>
                    </Confirm>}
            </>
        );
    };

    return (
        <ListedView
            shade={isEditing || confirming !== null}
            pageTitle="Passwords"
            pageAction="Add Item"
            timeName="Last Used"
            pageActionClick={switchAccountViewHandler}
            popups={<Popups/>}>

            {accounts && accounts.map((account, key) => (
                <ListedViewItem
                    key={key} dkey={key}
                    account={account}
                    onEditClickHandler={onEditClickHandler}
                    onCopyClick={onCopyClick}
                    onShowClick={onShowClick}
                    setConfirming={setConfirming}
                />
            ))}
        </ListedView>
    );
};

export default Passwords;
