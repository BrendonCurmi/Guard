import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ListedView from "../../components/views/ListedView";
import ListedViewItem from "../../components/views/ListedViewItem";
import useAsync from "../../hooks/use-async";

import { decode, encode } from "../../utils/URLUtils";

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

    const deleteFolderHandler = async () => {
        //todo implement
        const rawResponse = await fetch(`http://localhost:4000/api/folder/`, {
            method: "DELETE"
        });

        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            // console.log(content);
            <Redirect to="/pass" push />
        }
    };

    return (
        <ListedView
            pageTitle={folderName}
            pageAction="Add Item"
            pageActionClick={deleteFolderHandler}
            timeName="Last Used">
            {items.folders && items.folders.map((account, key) => (
                <ListedViewItem
                    key={key} dkey={key}
                    account={account}
                    // onEditClickHandler={onEditClickHandler}
                    // onCopyClick={onCopyClick}
                    // onShowClick={onShowClick}
                    // setConfirming={setConfirming}
                />
            ))}
        </ListedView>
    );
};

export default Folder;
