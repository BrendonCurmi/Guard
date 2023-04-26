import { PasswordData } from "../../pages/Passwords";
import { PinData } from "../../pages/Pins";
import { NoteData } from "../../pages/Notes";

export const getData = (type) => {
    switch (type) {
        case "accounts":
            return PasswordData;
        case "pins":
            return PinData;
        case "notes":
            return NoteData;
    }
};
