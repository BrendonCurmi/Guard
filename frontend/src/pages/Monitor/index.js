import React from "react";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import ListedTable from "../../components/listed/ListedTable";
import { getVault } from "../../storage/VaultCache";
import { getData } from "../../components/Profile";
import { decryptData } from "../../security/SecurityUtils";
import { check, getPasswordStrength, getScore, PasswordStrength } from "../../utils/StrengthEvaluator";

import classes from "./index.module.scss";

const Monitor = () => {
    const dataTypeName = "accounts";
    const accounts = getVault()[dataTypeName];
    const itemDataType = getData(dataTypeName);

    const total = accounts.length;
    let sum = 0;
    let numWeakPasswords = 0;
    let numStrongPasswords = 0;

    const weakPasswords = [];

    const reusedCache = {};
    let reused = 0;

    accounts.map((item) => {
        const pw = itemDataType.copyField(item);
        const decrypted = decryptData(pw);
        const result = check(decrypted);
        let addToWeak = false;

        // Check if strong or weak password
        if (getPasswordStrength(result) === PasswordStrength.STRONG) {
            numStrongPasswords++;
        } else {
            numWeakPasswords++;
            addToWeak = true;
        }

        // Check if has been reused
        if (reusedCache[decrypted]) {
            reused++;
            addToWeak = true;
        }

        reusedCache[decrypted] = 1;

        if (addToWeak) {
            weakPasswords.push(item);
        }

        // Calculate percentage and sum
        const score = getScore(result);
        const percentage = ((score + 1) / 5) * 100;
        sum += percentage;
    });

    const getWeakPasswords = () => {
        return { [dataTypeName]: weakPasswords };
    };

    const Progress = ({ value }) => {
        const getColour = (strengthScore) => {
            if (strengthScore <= 50) return "red";
            else if (strengthScore > 50 && strengthScore < 90) return "yellow";
            else if (strengthScore >= 90) return "green";
        };
        return (
            <Box className={classes.circle}>
                <CircularProgress value={100}
                                  className={classes.backgroundCircle}
                                  variant="determinate"
                                  size={150}
                                  thickness={4}/>
                <CircularProgress value={value}
                                  className={classes.foregroundCircle}
                                  sx={{ color: getColour(value) }}
                                  variant="determinate"
                                  size={150}
                                  thickness={4}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Typography variant="caption" component="div" className={classes.circleValue}>
                        {`${Math.round(value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    };

    const healthValue = sum / total || 0;

    return (
        <ListedTable dataType={dataTypeName} loadItems={getWeakPasswords}>
            <h1 className={classes.pageTitle}>Password Health</h1>
            <div className={classes.monitor}>
                <Progress value={healthValue}/>
                <div className={classes.healthInfoGrid}>
                    <div className={classes.healthInfoCard}>
                        <p>Total</p>
                        <p>{total}</p>
                    </div>
                    <div className={classes.healthInfoCard}>
                        <p>Strong</p>
                        <p>{numStrongPasswords}</p>
                    </div>
                    <div className={classes.healthInfoCard}>
                        <p>Reused</p>
                        <p>{reused}</p>
                    </div>
                    <div className={classes.healthInfoCard}>
                        <p>Weak</p>
                        <p>{numWeakPasswords}</p>
                    </div>
                </div>
                <div className={classes.tipsSection}>
                    <p className={classes.tipsTitle}>TIP: Change your weak or reused passwords</p>
                    <p className={classes.tipsContent}>
                        Long sentences and passphrases are better than passwords with special characters.
                        You can use the <Link to="/gen">Password Generator</Link> to generate strong passwords.
                    </p>
                </div>
            </div>
        </ListedTable>
    );
};

export default Monitor;
