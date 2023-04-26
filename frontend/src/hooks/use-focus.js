import React, { useState } from "react";
import FocusedView from "../components/passwords/FocusedView";
import Confirm from "../components/confirm/Confirm";

import { PasswordData } from "../pages/Passwords";
import { PinData } from "../pages/Pins";

import classes from "";

const useFocus = (loadAllItems, getCreds) => {
    // const typeData = type;
    // if (!typeData) return `<p>No type ${type}</p>`;
    // const { endpoints, fields } = typeData;
    // const { loadApi, createApi, updateApi, deleteApi, credentialsApi } = endpoints;


    const [isEditing, setIsEditing] = useState(false);
    const [focused, setFocused] = useState();
    const [confirming, setConfirming] = useState(null);

    const [dataTypeData, setData] = useState(false);

    const focusOn = (item, type) => {
        setFocused(item);
        setIsEditing(true);
        setData(getData(type));
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

    /**
     * Clear focused item and either open or close view.
     */
    const switchFocusedViewHandler = () => {
        setIsEditing(prevState => !prevState);
        setFocused(null);
    };


    const Popups = () => {
        return (
            <>
                {isEditing &&
                    <div className={classes.viewWrapper}>
                        <FocusedView onClick={switchFocusedViewHandler}
                                     focus={focused}
                                     submitItemRequest={submitItemRequest}
                                     getCreds={getCreds}
                                     fields={dataTypeData.fields}
                                     dataType={dataTypeData}
                            // icon={icon}
                        />
                    </div>}
                {confirming !== null &&
                    <Confirm className={classes.viewWrapper}
                             onCancel={() => setConfirming(null)}
                        // onConfirm={deleteItemOnConfirmationHandler}
                    >
                        <h2>{confirm.title}</h2>
                        <h4>{confirm.msg}</h4>
                    </Confirm>}
            </>
        );
    };


    return [focusOn, Popups, dataTypeData];
};

export const getData = (type) => {
    switch (type) {
        case "accounts":
            return PasswordData;
        case "pins":
            return PinData;
    }
}

export default useFocus;
