import React, { useEffect, useState } from "react";

import ListedViewItem from "./ListedViewItem";
import FocusedModal from "./modals/FocusedModal";
import ConfirmModal from "./modals/ConfirmModal";

import { getData } from "./Profile";
import { safeFetch } from "../../utils/SafeFetch";
import { copyToClipboard } from "../../utils/CopyUtils";
import { decryptData } from "../../../security/SecurityUtils";
import { getVault, loadVault } from "../../storage/VaultCache";

import classes from "./ListedTable.module.scss";

/**
 * Displays a table that loads a list of items into it, and
 * can display modals.
 * @param confirm the confirm modal properties, including
 * modal title and message.
 * @param deleteApi the optional API function to delete items.
 * @param dataType the optional item type.
 * @param deleteItemHandler the optional delete handler.
 * @param loadDeps the dependencies for reloading items.
 * @param listedViewProps the props for ListedViewItems.
 * @param loadItems optional function to load encrypted items data instead.
 * @param head array of table head column names.
 * @param children element header children.
 * @returns {JSX.Element}
 */
const ListedTable = ({
                      confirm = { title: "Are you sure?", msg: "Do you really want to delete this? It will be moved to Trash" },
                      deleteApi = "",
                      dataType,
                      deleteItemHandler,
                      loadDeps = [],
                      listedViewProps,
                      loadItems = null,
                      head=["", "", "", ""],
                      children
                  }) => {
    ////////////////////////
    // View Items
    ////////////////////////
    const [items, setItems] = useState({});

    /**
     * Decrypts the specified items data object, in
     * the form: {accounts: [{...}], pins: [{...}]}
     * @param data items data object with encrypted data.
     * @returns {JSON} the decrypted items data object.
     */
    const decryptDataObject = (data) => {
        const decryptedData = structuredClone(data);
        Object.keys(data).map(type => {
            return data[type].map((item, itemIndex) => {
                for (let key in item) {
                    let value = item[key];
                    if (typeof value === "string" && !key.startsWith("_")
                        && !(key === "date" || key === "lastAccess" || key === "deletedDate" || key === "type" || key === "user")) {
                        value = decryptData(value);
                    }
                    decryptedData[type][itemIndex][key] = value;
                }
            });
        });
        return decryptedData;
    };

    /**
     * Loads all items from the local Vault.
     */
    const loadAllItems = () => {
        const itemsData = loadItems !== null ? loadItems() : { [dataType]: getVault()[dataType] };
        const decryptedItemsData = decryptDataObject(itemsData);
        setItems(decryptedItemsData);
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

    // Open empty focus modal, as an event to allow activating from children
    document.addEventListener("openFocusModal", () => focusOn({}));

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

        const res = await (focused && JSON.stringify(focused) !== "{}" ? callUpdateItem(focused._id, data) : callCreateItem(data));
        if (res.status === 201 || res.status === 204) {
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
        const res = await safeFetch(deleteUrl, "DELETE");
        if (res.status === 200) {
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
                display={itemDataType.listDisplay}
                icon={itemDataType.icon(item.site)}
                onEditClickHandler={onEditClickHandler}
                onCopyClickHandler={onCopyClickHandler}
                setConfirming={setConfirming}
                listedViewProps={listedViewProps}
                allowActions={!areModalsOpen}
                reload={freshReloadVault}/>;
        });
    });

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
                {children}
                <table>
                    <thead>
                    <tr>
                        <th width="1%">{head[0]}</th>
                        <th width="34%">{head[1]}</th>
                        <th width="30%">{head[2]}</th>
                        <th width="35%">{head[3]}</th>
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

export default ListedTable;
