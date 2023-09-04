import React from "react";
import PasswordStrengthBar from "./PasswordStrengthBar";
import { check, getCrackTime, getMsg, getPasswordStrength, getScore } from "../../utils/StrengthEvaluator";

import classes from "./PasswordEvaluation.module.scss";

/**
 * Displays a password evaluation section, with a PasswordStrengthBar
 * and optional detailed information.
 * @param pw the password to evaluate.
 * @param detailed if additional information should be shown.
 * @returns {JSX.Element|string}
 */
const PasswordEvaluation = ({ pw, detailed = true }) => {
    if (pw === "") return "";
    const result = check(pw);

    const Details = () => {
        const msg = getMsg(result);
        return (
            <>
                <p className={classes.strength}>{getPasswordStrength(result)} Password</p>
                <p className={classes.time}>Password can be cracked in <b>{getCrackTime(result)}</b></p>
                {msg && <p className={classes.msg}>Suggestion: {msg}</p>}
            </>
        );
    };
    return (
        <div className={classes.evaluator}>
            <PasswordStrengthBar strengthScore={getScore(result)}/>
            {detailed && <Details/>}
        </div>
    );
};

export default PasswordEvaluation;
