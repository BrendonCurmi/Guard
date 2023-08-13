import React, { useState } from "react";
import { TextField } from "@mui/material";

const FormInput = ({ onChangeValidation, onChange, ...props }) => {
    const [errorMsg, setErrorMsg] = useState(false);

    const errorProps = errorMsg ? { error: true, helperText: errorMsg } : "";

    const onChangeHandler = (event, property = event.target.id) => {
        onChangeValidation(event.target.value, setErrorMsg);
        onChange(event, property);
    };

    return <TextField onChange={onChangeHandler}
                      variant="filled"
                      type="text"
                      {...props}
                      {...errorProps}/>;
};

export default FormInput;
