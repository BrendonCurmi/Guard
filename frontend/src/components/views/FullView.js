import React, { useEffect, useState } from "react";

import ListedView from "./ListedView";
import ListedViewItem from "./ListedViewItem";
import FocusedView from "../passwords/FocusedView";
import Confirm from "../confirm/Confirm";

import { copyToClipboard } from "../../utils/CopyUtils";

/**
 * @param loadApi the url of the api to load all items.
 * @param createApi the url of the api to create an item.
 * @param updateApi the url of the api to update the item.
 * @param deleteApi the url of the api to delete the item.
 * @param credentialsApi the url of the api to retrieve the item's credentials.
 * @param copy
 * @param confirmTitle
 * @param confirmMsg
 * @param pageTitle
 * @param pageAction
 * @param timeName
 * @param fields
 * @returns {JSX.Element}
 */
const fullView = ({
                      loadApi,
                      createApi,
                      updateApi = val => `${createApi}/${val}`,
                      deleteApi = val => `${createApi}/${val}`,
                      credentialsApi = val => `${createApi}/${val}/credentials`,
                      copy,
                      confirmTitle,
                      confirmMsg,

                      pageTitle,
                      pageAction,
                      timeName,
                      fields
                  }) => {

    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [focused, setFocused] = useState();
    const [confirming, setConfirming] = useState(null);

    /**
     * Submit create/update requests, reload all items, and close FocusedView.
     * @param data the data to create/update.
     */
    const submitItemRequest = async (data) => {
        const rawResponse = await (focused ? callUpdateItem(focused._id, data) : callCreateItem(data));
        if (rawResponse.status === 201 || rawResponse.status === 204) {
            // const content = await rawResponse.json();
            await loadAllItems();
            switchFocusedViewHandler();
        }
    };

    const callCreateItem = (data) => {
        return send(createApi, "POST", data);
    };

    const callUpdateItem = (id, data) => {
        return send(updateApi(id), "PUT", data);
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

    // Load items after loading component
    useEffect(() => {
        loadAllItems();
    }, []);

    /**
     * Load all items.
     */
    const loadAllItems = async () => {
        const res = await fetch(loadApi);
        const accountData = await res.json();
        console.log("API REQUEST SHOULD BE DONE ONCE")
        setItems(accountData);
    };

    /**
     * Clear focused item and either open or close view.
     */
    const switchFocusedViewHandler = () => {
        setIsEditing(prevState => !prevState);
        setFocused(null);
    };


    const deleteItemOnConfirmationHandler = async () => {
        if (confirming === null) return;
        const rawResponse = await fetch(deleteApi(items[confirming]._id), { method: "DELETE" });
        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            // console.log(content);
            await loadAllItems();
            setConfirming(null);
        }
    };

    const onEditClickHandler = (key) => {
        setFocused(items[key]);
        setIsEditing(true);
    };

    const onCopyClick = async (key) => {
        const creds = await getCreds(items[key]._id);
        copyToClipboard(copy(creds));
    };

    const onShowClick = (key) => {
        setItems(prevState => {
            prevState[key].editing = !prevState[key].editing;
            return [...prevState];
        });
    };

    const getCreds = async (id) => {
        const res = await fetch(credentialsApi(id));
        return await res.json();
    };

    const Popups = () => {
        return (
            <>
                {isEditing &&
                    <div>
                        <FocusedView onClick={switchFocusedViewHandler}
                                     focus={focused}
                                     submitAccountRequest={submitItemRequest}
                                     getCreds={getCreds}
                                     fields={fields}
                        />
                    </div>}
                {confirming !== null &&
                    <Confirm onCancel={() => setConfirming(null)}
                             onConfirm={deleteItemOnConfirmationHandler}>
                        <h2>{confirmTitle}</h2>
                        <h4>{confirmMsg}</h4>
                    </Confirm>}
            </>
        );
    };

    return (
        <ListedView
            shade={isEditing || confirming !== null}
            pageTitle={pageTitle}
            pageAction={pageAction}
            timeName={timeName}
            pageActionClick={switchFocusedViewHandler}
            popups={<Popups/>}>

            {items && items.map((item, key) => (
                <ListedViewItem
                    key={key} dKey={key}
                    account={item}
                    onEditClickHandler={onEditClickHandler}
                    onCopyClick={onCopyClick}
                    onShowClick={onShowClick}
                    setConfirming={setConfirming}
                />
            ))}
        </ListedView>
    );
};

export default fullView;
