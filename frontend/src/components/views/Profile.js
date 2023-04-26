import { PasswordData } from "../../pages/Passwords";
import { PinData } from "../../pages/Pins";

export const getData = (type) => {
    switch (type) {
        case "accounts":
            return PasswordData;
        case "pins":
            return PinData;
    }
};
