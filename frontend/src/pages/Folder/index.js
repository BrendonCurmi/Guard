import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

import ListedView from "../../components/views/ListedView";
import ListedViewItem from "../../components/views/ListedViewItem";
import { getData } from "../../components/passwords/Profile";

import { copyToClipboard } from "../../utils/CopyUtils";
import { decode, encode } from "../../utils/URLUtils";
import { useFolders } from "../../store/FolderProvider";
import useFocus  from "../../hooks/use-focus";
import useAsync from "../../hooks/use-async";

const API = "http://localhost:4000/api/folderView";

const Folder = () => {
    const [items, setItems] = useState({});
    const { name } = useParams();
    const folderName = decode(name);

    /**
     * Load all items.
     */
    const loadAllItems = async () => {
        const res = await fetch(`${API}?f=${encode(folderName)}`);
        const accountData = await res.json();
        console.log("API REQUEST SHOULD BE DONE ONCE")
        setItems(accountData);
    };

    const getItems = async () => {
        const rawResponse = await fetch(`${API}?f=${encode(folderName)}`, { method: "GET" });
        return await rawResponse.json();
    };

    useEffect(loadAllItems, [name]);


    const getCreds = async (dataType, id) => {
        const res = await fetch(dataType.endpoints.credentialsApi(id));
        return await res.json();
    };

    //useAsync(getItems, data => setItems(data), [name]);
    const [focusOn, Popups, dataTypeData] = useFocus(loadAllItems, getCreds);

    const navigate = useNavigate();
    const folders = useFolders();

    const deleteFolderHandler = async () => {
        const rawResponse = await fetch(`http://localhost:4000/api/folder/`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ search: folderName })
        });

        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            // console.log(content);
            folders.loadFolders();
            navigate("/pass");
        }
    };

    const [data, setData] = useState(false);





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
        return items[type].map((account, accountIndex) => {
            const key = `${type}-${accountIndex}`;
            return <ListedViewItem
                key={key} dKey={key}
                account={account}
                {...itemProps}
                onEditClickHandler={onEditClickHandler}
                onCopyClick={onCopyClick}
                // onShowClick={onShowClick}
                // setConfirming={setConfirming}
            />;
        });
    });

    return (
        <ListedView
            pageTitle={folderName}
            pageAction="Delete Folder"
            pageActionClick={deleteFolderHandler}
            timeName="Last Used"
            popups={<Popups/>}>
            {viewItems}
        </ListedView>
    );
};

export default Folder;
