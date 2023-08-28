import React from "react";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { decryptData } from "../../../../security/SecurityUtils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    // Position popup
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left"
    }
};

// Adapted from and examples from: https://mui.com/material-ui/react-select/
const FolderSelect = ({ className, allFolders, label, readOnly, value, onChange }) => {
    // Cache for the folder ids and names
    const idNameMap = {};
    const folderItems = Object.keys(allFolders).map(key => {
        const { _id, name } = allFolders[key];
        const decryptedName = decryptData(name);
        idNameMap[_id] = decryptedName;
        return <MenuItem key={_id} value={_id}>{decryptedName}</MenuItem>;
    });
    return (
        <FormControl className={className} disabled={readOnly}>
            <InputLabel id="input-folder-label">{label}</InputLabel>
            <Select
                labelId="input-folder-label"
                id="input-folder-label"
                multiple
                value={value}
                onChange={onChange}
                input={<OutlinedInput id="input-folder-label" label={label}/>}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={idNameMap[value]}/>
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}>
                {folderItems}
            </Select>
        </FormControl>
    );
};

export default FolderSelect;
