import React, { useEffect, useState } from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

import ListedView from "./ListedView";
import ListedViewItem from "./ListedViewItem";
import PopupsView from "./popups/PopupsView";
import { getData } from "./Profile";

import { copyToClipboard } from "../../utils/CopyUtils";

/**
 * ListedView that loads items into it.
 * @param page the page variables.
 * @param confirm the confirm variables.
 * @param icon the icon.
 * @param loadApi the API to load items.
 * @param dataType the optional item type.
 * @param deleteItemHandler the optional delete handler.
 * @param loadDeps the dependencies for reloading items.
 * @returns {JSX.Element}
 */
const FullView = ({
                      page = { title: "", action: "", timeName: "" },
                      confirm = { title: "", msg: "" },
                      icon,
                      loadApi,
                      dataType,
                      deleteItemHandler,
                      loadDeps = []
                  }) => {
    const [items, setItems] = useState([]);

    /**
     * Load all items in the view.
     */
    const loadAllItems = async () => {
        const res = await fetch(loadApi);
        const accountData = await res.json();
        console.log("API REQUEST SHOULD BE DONE ONCE")
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
        const creds = await getCreds(dataType, items[type][index]._id);
        copyToClipboard(dataType.copyField(creds));
    };

    const getCreds = async (dataType, id) => {
        const res = await fetch(dataType.endpoints.credentialsApi(id));
        return await res.json();
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
            return fetch(url, {
                method: method,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        };


        const rawResponse = await (focused ? callUpdateItem(focused._id, data) : callCreateItem(data));
        if (rawResponse.status === 201 || rawResponse.status === 204) {
            // const content = await rawResponse.json();
            await loadAllItems();
            switchFocusedViewHandler();
        }
    };


    const deleteItemOnConfirmationHandler = async () => {
        if (confirming === null) return;
        const [type, index] = confirming.split("-");
        console.log("2", items[type][index]._id);
        return;
        const rawResponse = await fetch(dataTypeData.endpoints.deleteApi(items[type][index]._id), { method: "DELETE" });
        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            // console.log(content);
            await loadAllItems();
            setConfirming(null);
        }
    };

    const viewItems = Object.keys(items).map((type) => {
        // Define type-specific props
        const itemProps = {};
        switch (type) {
            case "accounts":
                break;
            case "pins":
                itemProps.icon = faFolder;
                break;
        }
        itemProps.type = type;
        return items[type].map((item, itemIndex) => {
            const key = `${type}-${itemIndex}`;
            return <ListedViewItem
                key={key} dKey={key}
                account={item}
                {...itemProps}
                onEditClickHandler={onEditClickHandler}
                onCopyClick={onCopyClick}
                setConfirming={setConfirming}/>;
        });
    });

    const call = (defaultFn, optionalFn) => {
        return optionalFn ? optionalFn : defaultFn;
    };

    const popupsView = <PopupsView
        className={classes.viewWrapper}
        onCancelFocused={switchFocusedViewHandler}
        onSubmitFocused={submitItemRequest}
        onConfirmConfirm={call(deleteItemOnConfirmationHandler, deleteItemHandler)}
        onCancelConfirm={() => setConfirming(null)}

        isEditing={isEditing}
        confirming={confirming}
        focused={focused}

        dataType={dataTypeData}
        getCreds={getCreds}
        focusedIcon={icon}
        confirmVals={confirm}/>;

    const isShade = isEditing || confirming !== null;
    const pageActionClick = call(switchFocusedViewHandler, deleteItemHandler);
    const { title, action, timeName } = page;

    return (
        <ListedView
            shade={isShade}
            pageTitle={title}
            pageAction={action}
            timeName={timeName}
            pageActionClick={pageActionClick}
            popups={popupsView}>
            {viewItems}
        </ListedView>
    );
};

export default FullView;
