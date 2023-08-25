import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

import ListedViewItem from "./ListedViewItem";
import CircleButton from "../buttons/CircleButton";
import FocusedView from "./popups/FocusedView";
import ConfirmView from "./popups/ConfirmView";

import { getData } from "./Profile";
import { safeFetch } from "../../utils/SafeFetch";
import { copyToClipboard } from "../../utils/CopyUtils";
import { decryptData } from "../../../security/SecurityUtils";
import { getVault, loadVault } from "../../utils/VaultCache";

import classes from "./FullView.module.scss";

/**
 * ListedView that loads items into it.
 * @param page the page variables.
 * @param confirm the confirm variables.
 * @param loadApi the API to load items.
 * @param deleteApi the optional API function to delete items.
 * @param dataType the optional item type.
 * @param deleteItemHandler the optional delete handler.
 * @param loadDeps the dependencies for reloading items.
 * @param listedViewProps the props for ListedViewItems.
 * @returns {JSX.Element}
 */
const FullView = ({
                      page = { title: "", actionTitle: "", timeName: "", action: "", actions: "" },
                      confirm = { title: "", msg: "" },
                      loadApi,
                      deleteApi = "",
                      dataType,
                      deleteItemHandler,
                      loadDeps = [],
                      listedViewProps
                  }) => {
    const [items, setItems] = useState({});

    const getDecryptedData = (items) => {
        const decryptedData = structuredClone(items);
        for (let i = 0; i < items.length; i++) {
            for (let key in items[i]) {
                let value = items[i][key];
                if (typeof value === "string" && !key.startsWith("_")
                    && !(key === "date" || key === "lastAccess" || key === "deletedDate" || key === "type")) {
                    value = decryptData(value);
                }
                decryptedData[i][key] = value;
            }
        }
        return decryptedData;
    };

    /**
     * Load all items in the view.
     */
    const loadAllItems = () => {
        const encryptedVaultData = getVault()[dataType];
        const vaultItems = getDecryptedData(encryptedVaultData);
        const accountData = { [dataType]: vaultItems};
        setItems(accountData);
    };

    // Load items after loading component
    useEffect(loadAllItems, [...loadDeps]);

    // Actions
    const onEditClickHandler = (key) => {
        const [type, index] = key.split("-");
        focusOn(items[type][index], type);
    };

    const onCopyClick = async (key) => {
        const [type, index] = key.split("-");
        const dataType = getData(type);
        const item = items[type][index];
        copyToClipboard(dataType.copyField(item));
    };

    const [isEditing, setIsEditing] = useState(false);
    const [focused, setFocused] = useState();
    const [confirming, setConfirming] = useState(null);

    const [dataTypeData, setData] = useState(false);

    const focusOn = (item, type) => {
        setFocused(item);
        setIsEditing(prevState => !prevState);
        if (type) setData(getData(type));
    };

    /**
     * Clear focused item and either open or close view.
     */
    const switchFocusedViewHandler = () => {
        focusOn(null, dataType);
    };

    /**
     * Submit create/update requests, reload all items, and close FocusedView.
     * @param data the data to create/update.
     */
    const submitItemRequest = async (data) => {
        const callCreateItem = (data) => {
            // return send(createApi, "POST", data);
            return send(dataTypeData.endpoints.createApi, "POST", data);
        };

        const callUpdateItem = (id, data) => {
            // return send(updateApi(id), "PUT", data);
            return send(dataTypeData.endpoints.updateApi(id), "PUT", data);
        };

        const send = (url, method, data) => {
            return safeFetch(url, method, data);
        };


        const rawResponse = await (focused ? callUpdateItem(focused._id, data) : callCreateItem(data));
        if (rawResponse.ok) {
            // const content = await rawResponse.json();
            await loadVault();
            loadAllItems();
            switchFocusedViewHandler();
        }
    };


    const deleteItemOnConfirmationHandler = async () => {
        if (confirming === null) return;
        const [type, index] = confirming.split("-");
        const deleteId = items[type][index]._id;

        const getEndpointDeleteApi = (deleteId) => {
            const dataType = getData(type);
            return dataType.endpoints.deleteApi(deleteId);
        };

        const deleteUrl = deleteApi ? deleteApi(deleteId) : getEndpointDeleteApi(deleteId);
        const rawResponse = await safeFetch(deleteUrl, "DELETE");
        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            // console.log(content);
            await loadVault();
            loadAllItems();
            setConfirming(null);
        }
    };

    const call = (defaultFn, optionalFn) => {
        return optionalFn ? optionalFn : defaultFn;
    };

    const isShade = isEditing || confirming !== null;
    const { title, actionTitle, action, actions, timeName, actionIcon = faAdd } = page;
    const pageActionClick = call(switchFocusedViewHandler, action);

    const viewItems = Object.keys(items).map(type => {
        return items[type].map((item, itemIndex) => {
            const itemType = item.type || type;
            const itemDataType = getData(itemType);
            const key = `${type}-${itemIndex}`;
            return <ListedViewItem
                key={key} dKey={key}
                account={item}
                icon={itemDataType.icon(item.site)}
                onEditClickHandler={onEditClickHandler}
                onCopyClick={onCopyClick}
                setConfirming={setConfirming}
                listedViewProps={listedViewProps}
                allowActions={!isShade}
                reload={loadAllItems}/>;
        });
    });

    const DefaultPageActions = () => {
        return (
            <CircleButton type="button"
                          color="secondary"
                          tooltip={actionTitle}
                          onClick={pageActionClick}>
                <FontAwesomeIcon icon={actionIcon}/>
            </CircleButton>
        );
        //return <a className={classes.button} onClick={pageActionClick}>{actionTitle}</a>;
    };

    const PageActions = actions || DefaultPageActions;

    return (
        <div id="wrapper" className={classes.wrapper}>
            <FocusedView
                show={isEditing}
                onClick={switchFocusedViewHandler}
                focus={focused}
                submitItemRequest={submitItemRequest}
                dataType={dataTypeData}
                fields={dataTypeData.fields}/>

            <ConfirmView
                show={confirming !== null}
                // onCancel={onCancelConfirm}
                onCancel={() => setConfirming(null)}
                // onConfirm={onConfirmConfirm}
                onConfirm={call(deleteItemOnConfirmationHandler, deleteItemHandler)}
                confirm={confirm}/>

            <div className={classes.contentWrapper}>
                <div className={classes.header}>
                    <h1 className={classes.title}>{title}</h1>
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
                            <a>{timeName}</a>
                        </th>
                        <th width="35%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {viewItems}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FullView;
