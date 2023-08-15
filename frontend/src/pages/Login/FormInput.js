import React from "react";
import { TextField } from "@mui/material";

const FormInput = ({ onChangeValidation, showError, errorMsg, validation, value, ...props }) => {
    const valid = validation(value || "");
    const errorProps = showError && !valid ? { error: true, helperText: errorMsg } : "";
    return <TextField variant="filled"
                      type="text"
                      {...props}
                      {...errorProps}/>;
};

export default FormInput;
