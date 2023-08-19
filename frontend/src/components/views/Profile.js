import { PasswordData } from "../../pages/Passwords";
import { PinData } from "../../pages/Pins";
import { NoteData } from "../../pages/Notes";
import { FolderData } from "../../pages/Folders";

export const getData = (type) => {
    switch (type) {
        case "accounts":
            return PasswordData;
        case "pins":
            return PinData;
        case "notes":
            return NoteData;
        case "folders":
            return FolderData;
    }
};
