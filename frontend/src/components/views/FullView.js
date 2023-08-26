import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

import ListedViewItem from "./ListedViewItem";
import CircleButton from "../buttons/CircleButton";
import FocusedModal from "./modals/FocusedModal";
import ConfirmModal from "./modals/ConfirmModal";

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
                      deleteApi = "",
                      dataType,
                      deleteItemHandler,
                      loadDeps = [],
                      listedViewProps
                  }) => {
    ////////////////////////
    // View Items
    ////////////////////////
    const [items, setItems] = useState({});

    /**
     * Decrypts the specified Vault data.
     * @param items
     * @returns {any}
     */
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
     * Loads all items from the local Vault.
     */
    const loadAllItems = () => {
        const encryptedVaultData = getVault()[dataType];
        const vaultItems = getDecryptedData(encryptedVaultData);
        const accountData = { [dataType]: vaultItems};
        setItems(accountData);
    };

    // Load items after loading component
    useEffect(loadAllItems, [...loadDeps]);

    /**
     * Freshly syncs local Vault with server and reloads all view items.
     */
    const freshReloadVault = async () => {
        await loadVault();
        loadAllItems();
    };

    ////////////////////////
    // Actions
    ////////////////////////
    /**
     * Handler for focusing on and editing specified item.
     * @param key item key.
     */
    const onEditClickHandler = (key) => {
        const [type, index] = key.split("-");
        focusOn(items[type][index], type);
    };

    /**
     * Handler for copying item's field based on its data type.
     * @param key item key.
     */
    const onCopyClickHandler = (key) => {
        const [type, index] = key.split("-");
        const dataType = getData(type);
        const item = items[type][index];
        copyToClipboard(dataType.copyField(item));
    };

    ////////////////////////
    // Focused and confirming items
    ////////////////////////
    const [focusedData, setFocusedData] = useState(false);
    const [focused, setFocused] = useState();
    const [confirming, setConfirming] = useState();

    /**
     * Focuses on the specified item object, and sets the
     * specified focused item data. If item is an empty
     * object {}, the focus will be opened but empty.
     * If the focus data is empty, it will default to the
     * view data type. This is to allow for empty items
     * to open the focus with appropriate data fields.
     * @param item object to focus on.
     * @param type data type of focused item.
     */
    const focusOn = (item, type = dataType) => {
        setFocused(item);
        if (type) setFocusedData(getData(type));
    };

    /**
     * Clears the currently focused item.
     */
    const clearFocused = () => focusOn(null);

    /**
     * Submits create/update requests, reloads all items, and closes FocusedModal.
     * @param data the data to create/update.
     */
    const submitItemRequest = async (data) => {
        // Call create API from View data type
        const callCreateItem = (data) => safeFetch(getData(dataType).endpoints.createApi, "POST", data);

        // Call update API from focused data type
        const callUpdateItem = (id, data) => safeFetch(focusedData.endpoints.updateApi(id), "PUT", data);

        const response = await (focused ? callUpdateItem(focused._id, data) : callCreateItem(data));
        if (response.status === 201 || response.status === 204) {
            await freshReloadVault();
            clearFocused();
        }
    };

    /**
     * Deletes the confirming item, reloads all items, and closes ConfirmModal.
     */
    const deleteItemOnConfirmationHandler = async () => {
        if (!confirming) return;
        const [type, index] = confirming.split("-");
        const deleteId = items[type][index]._id;

        const getEndpointDeleteApi = (deleteId) => getData(type).endpoints.deleteApi(deleteId);

        const deleteUrl = deleteApi ? deleteApi(deleteId) : getEndpointDeleteApi(deleteId);//todo check this after folder page
        const response = await safeFetch(deleteUrl, "DELETE");
        if (response.status === 200) {
            await freshReloadVault();
            setConfirming(null);
        }
    };

    const call = (defaultFn, optionalFn) => {
        return optionalFn ? optionalFn : defaultFn;
    };

    // Disable actions if modals are open
    const areModalsOpen = !!focused || !!confirming;

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
                onCopyClickHandler={onCopyClickHandler}
                setConfirming={setConfirming}
                listedViewProps={listedViewProps}
                allowActions={!areModalsOpen}
                reload={freshReloadVault}/>;
        });
    });

    const { title, actionTitle, action, actions, timeName, actionIcon = faAdd } = page;

    // Use optional action if page defined it, otherwise open empty focus modal
    const pageActionClickHandler = call(() => focusOn({}), action);

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

    ////////////////////////
    // Modals
    ////////////////////////
    const focusedModal = (
        <FocusedModal onClick={clearFocused}
                      focus={focused}
                      submitItemRequest={submitItemRequest}
                      dataType={focusedData}
                      fields={focusedData.fields}/>
    );

    const confirmModal = (
        <ConfirmModal confirm={confirm}
                      // onCancel={onCancelConfirm}
                      onCancel={() => setConfirming(null)}
                      // onConfirm={onConfirmConfirm}
                      onConfirm={call(deleteItemOnConfirmationHandler, deleteItemHandler)}/>
    );

    return (
        <div id="wrapper" className={classes.wrapper}>
            {!!focused && focusedModal}
            {!!confirming && confirmModal}
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
