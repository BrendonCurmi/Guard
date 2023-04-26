import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ListedView from "../../components/views/ListedView";
import ListedViewItem from "../../components/views/ListedViewItem";
import useAsync from "../../hooks/use-async";

import { decode, encode } from "../../utils/URLUtils";
import { useFolders } from "../../store/FolderProvider";

const API = "http://localhost:4000/api/folderView";

const Folder = () => {
    const [items, setItems] = useState({});
    const { name } = useParams();
    const folderName = decode(name);

    const getItems = async () => {
        const rawResponse = await fetch(`${API}?f=${encode(folderName)}`, { method: "GET" });
        if (rawResponse.status === 200) {
            return await rawResponse.json();
        }
    };

    useAsync(getItems, data => setItems(data), [name]);

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

    const viewItems = Object.keys(items).map((type) => {
        return items[type].map((account, key) => (
            <ListedViewItem
                key={key} dkey={key}
                account={account}
                // onEditClickHandler={onEditClickHandler}
                // onCopyClick={onCopyClick}
                // onShowClick={onShowClick}
                // setConfirming={setConfirming}
            />
        ));
    });

    return (
        <ListedView
            pageTitle={folderName}
            pageAction="Delete Folder"
            pageActionClick={deleteFolderHandler}
            timeName="Last Used">
            {viewItems}
        </ListedView>
    );
};

export default Folder;
