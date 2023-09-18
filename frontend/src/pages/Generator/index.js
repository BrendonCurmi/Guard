import React, { useEffect, useState } from "react";
import { Slider, Switch, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faArrowRotateForward } from "@fortawesome/free-solid-svg-icons";

import NiceButton from "../../components/buttons/NiceButton";
import { generate } from "../../utils/GeneratorUtils";
import { copyToClipboard } from "../../utils/CopyUtils";

import classes from "./index.module.scss";

const minLength = 10;
const maxLength = 60;
const initialLength = 16;

const marks = [];
for (let i = minLength; i <= maxLength; i += 10) {
    marks.push({ value: i });
}

const Generator = () => {
    const [values, setValues] = useState({
        length: initialLength,
        useCapitals: true,
        useDigits: true,
        useSymbols: true
    });
    const [generated, setGenerated] = useState("");

    const generateNew = () => setGenerated(generate(values));

    useEffect(() => {
        generateNew();
    }, [values]);

    const set = (obj) => {
        setValues({
            ...values,
            ...obj
        });
    };

    const onCopyClick = () => {
        copyToClipboard(generated);
    };

    function ValueLabelComponent(props) {
        const { children, value } = props;

        return (
            <Tooltip enterTouchDelay={0} placement="right" title={value}>
                {children}
            </Tooltip>
        );
    }

    return (
        <div className={classes.generatorPage}>
            <div className={classes.generator}>
                <p className={classes.text} onClick={onCopyClick}>
                    {generated}
                </p>
                <div className={classes.actions}>
                    <NiceButton type="button"
                                color="primary"
                                onClick={generateNew}><FontAwesomeIcon icon={faArrowRotateForward}/></NiceButton>
                    <NiceButton type="button"
                                color="primary"
                                onClick={onCopyClick}><FontAwesomeIcon icon={faCopy}/></NiceButton>
                </div>
            </div>
            <table>
                <tbody>
                <tr>
                    <td>Length</td>
                    <td className={classes.length}>
                        <Slider value={values.length}
                                marks={marks}
                                min={minLength}
                                max={maxLength}
                                color="secondary"
                                onChange={(event, value) => set({ length: value })}
                                slots={{
                                    valueLabel: ValueLabelComponent
                                }}
                        />
                        <p>{values.length}</p>
                    </td>
                </tr>
                <tr>
                    <td>Use capital letters (A-Z)</td>
                    <td><Switch defaultChecked
                                onChange={(event, value) => set({ useCapitals: value })}/></td>
                </tr>
                <tr>
                    <td>Use digits (0-9)</td>
                    <td><Switch defaultChecked
                                onChange={(event, value) => set({ useDigits: value })}/></td>
                </tr>
                <tr>
                    <td>Use symbols (@!$%&*)</td>
                    <td><Switch defaultChecked
                                onChange={(event, value) => set({ useSymbols: value })}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Generator;
