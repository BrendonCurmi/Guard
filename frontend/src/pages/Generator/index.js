import React, { useEffect, useState } from "react";
import { Slider, Switch, Tooltip } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faArrowRotateForward, faAdd } from "@fortawesome/free-solid-svg-icons";

import NiceButton from "../../components/buttons/NiceButton";

import { copyToClipboard } from "../../utils/CopyUtils";

import classes from "./index.module.scss";

const label = { inputProps: { "aria-label": "Switch test" } };

const min = 20;
const max = 60;

const marks = [];
for (let i = 20; i <= 60; i += 10) {
    marks.push({ value: i });
}

const Generator = () => {
    const [values, setValues] = useState({
        length: (min + max) / 2,
        useCapitals: true,
        useDigits: true,
        useSymbols: true
    });
    const [generated, setGenerated] = useState("");

    const getStringChars = () => {
        let chars = "abcdefghijklmnopqrstuvwxyz";
        if (values.useCapitals) {
            chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
        if (values.useDigits) {
            chars += "0123456789";
        }
        if (values.useSymbols) {
            chars += "@!$%&*";
        }
        return chars;
    };

    const generate = () => {
        let result = "";
        const chars = getStringChars();
        const charsLength = chars.length;
        const length = values.length;
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charsLength));
        }
        setGenerated(result);
    };

    useEffect(() => {
        generate();
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
                <p className={classes.text}>
                    {generated}
                </p>
                <div className={classes.actions}>
                    <NiceButton type="button"
                                color="primary"
                                onClick={generate}><FontAwesomeIcon icon={faArrowRotateForward}/></NiceButton>
                    <NiceButton type="button"
                                color="primary"
                                onClick={onCopyClick}><FontAwesomeIcon icon={faCopy}/></NiceButton>
                    <NiceButton type="button"
                                color="primary"
                                onClick={generate}><FontAwesomeIcon icon={faAdd}/></NiceButton>
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th width="50%"></th>
                    <th width="50%"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Length</td>
                    <td className={classes.length}>
                        <Slider value={values.length}
                                aria-label="custom label"
                            // aria-label="Default"
                                marks={marks}
                            // step={10}
                                min={min}
                                max={max}
                                color="secondary"
                            // valueLabelDisplay="on"
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
                    <td><Switch {...label}
                                defaultChecked
                                onChange={(event, value) => set({ useCapitals: value })}/></td>
                </tr>
                <tr>
                    <td>Use digits (0-9)</td>
                    <td><Switch {...label}
                                defaultChecked
                                onChange={(event, value) => set({ useDigits: value })}/></td>
                </tr>
                <tr>
                    <td>Use symbols (@!$%&*)</td>
                    <td><Switch {...label}
                                defaultChecked
                                onChange={(event, value) => set({ useSymbols: value })}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Generator;
