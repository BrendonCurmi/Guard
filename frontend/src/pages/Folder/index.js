import React  from "react";
import ListedView from "../../components/views/ListedView";

import { decode } from "../../utils/URLUtils";

const Folder = () => {
    const getFolderName = () => {
        const params = new URLSearchParams(window.location.search);
        return decode(params.get("f"));
    };
    const folderName = getFolderName();
    console.log("url", folderName);

    //const [accounts, setAccounts] = useState([]);

    return (
        <ListedView
            pageTitle={folderName}
            pageAction="Add Item"
            timeName="Last Used">
        </ListedView>
    );
};

export default Folder;
