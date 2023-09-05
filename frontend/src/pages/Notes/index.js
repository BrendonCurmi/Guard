import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import ListedPage from "../../components/listed/ListedPage";

export const NoteData = {
    fields: [
        {
            label: "Title",
            required: true,
            id: "input-title",
            value: "title"
        },
        {
            label: "Note",
            secure: true,
            required: true,
            id: "input-note",
            value: "note",
            multiline: true,
            maxRows: 7
        },
        {
            label: "Folders",
            id: "input-folders",
            value: "folders"
        }
    ],
    listDisplay: {
        title: item => item.title,
        subtitle: item => item.identity ? item.identity : ""
    },
    endpoints: {
        createApi: "http://localhost:4000/api/note",
        updateApi: val => `${NoteData.endpoints.createApi}/${val}`,
        deleteApi: val => `${NoteData.endpoints.createApi}/${val}`,
        credentialsApi: val => `${NoteData.endpoints.createApi}/${val}/credentials`
    },
    copyField: creds => creds.note,
    icon: () => <FontAwesomeIcon icon={faStickyNote}/>
}

const SecureNotes = () => {
    return <ListedPage
        page={{ title: "Secure Notes", actionTitle: "Add Secure Note", timeName: "Last Seen" }}
        dataType="notes"
        listedViewProps={{
            canCopy: false,
        }}/>;
};

export default SecureNotes;
