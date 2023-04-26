import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import SiteIcon from "../../components/SiteIcon";
import ConfirmView from "../../components/views/popups/ConfirmView";
import ListedView from "../../components/views/ListedView";

import { describeDate } from "../../utils/DateUtils";

import classes from "./index.module.scss";

const API = "http://localhost:4000/api/trash";

const Trash = () => {
    const [accounts, setAccounts] = useState([]);
    const [confirming, setConfirming] = useState(null);

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

    const Popup = () => {
        return (
            confirming !== null &&
            <ConfirmView className={classes.viewWrapper}
                         onCancel={() => setConfirming(null)}
                         onConfirm={deleteAccountOnConfirmationHandler}>
                <h2>Are you sure?</h2>
                <h4>Do you really want to delete this account? It can't be recovered once it's deleted</h4>
            </ConfirmView>
        );
    };

    return (
        <ListedView
            shade={confirming !== null}
            pageTitle="Trash"
            pageAction="Clear Trash"
            timeName="Date Deleted"
            popups={<Popup/>}>

            {accounts && accounts.map((account, key) => (
                <tr key={key}>
                    <td>
                        <SiteIcon domain={account.site} size="32"/>
                    </td>
                    <td>
                        <p>{account.title}</p>
                        {/*<p>{product.email || product.username}</p>*/}
                        <p>test</p>
                    </td>
                    <td>{describeDate(account.deletedDate)}</td>
                    <td>
                        <button>
                            <FontAwesomeIcon icon={faPencil}/>
                        </button>
                        <button onClick={() => setConfirming(key)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </td>
                </tr>
            ))}
        </ListedView>
    );
};

export default Trash;
