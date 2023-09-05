import React from "react";
import ListedTable from "../../components/views/ListedTable";
import { getVault } from "../../utils/VaultCache";
import { getData } from "../../components/views/Profile";
import { decryptData } from "../../../security/SecurityUtils";
import { check, getPasswordStrength, getScore, PasswordStrength } from "../../utils/StrengthEvaluator";

import classes from "./index.module.scss";

const Monitor = () => {
    const accounts = getVault()["accounts"];
    const itemDataType = getData("accounts");

    const getReusedPasswords = () => {
        let reused = 0;
        const tmp = {};
        accounts.map((item) => {
            if (tmp[item]) {
                reused++;
            }

            tmp[item] = 0;
        });
        return reused;
    };

    const total = accounts.length;
    let sum = 0;
    let numWeakPasswords = 0;
    let numStrongPasswords = 0;

    const weakPasswords = [];

    accounts.map((item) => {
        const pw = itemDataType.copyField(item);
        const decrypt = decryptData(pw);
        const result = check(decrypt);
        const score = getScore(result);

        if (getPasswordStrength(result) === PasswordStrength.STRONG) {
            numStrongPasswords++;
        } else {
            numWeakPasswords++;
            weakPasswords.push(item);
        }

        const percentage = ((score + 1) / 5) * 100;
        sum += percentage;
    });

    const dataType = "accounts";

    const getWeakPasswords = () => {
        return { [dataType]: weakPasswords };
    };

    return (
        <ListedTable dataType={dataType} loadItems={getWeakPasswords}>
            <div className={classes.monitorPage}>
                <p>Score: {(sum / total) + "%"}</p>
                <p>Total: {total}</p>
                <p>Reused: {getReusedPasswords()}</p>
                <p>Weak: {numWeakPasswords}</p>
                <p>Strong: {numStrongPasswords}</p>
            </div>
        </ListedTable>
    );
};

export default Monitor;
