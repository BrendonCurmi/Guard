import React from "react";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { getFoldersCache } from "../../../storage/FolderCache";

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
const FolderSelect = ({ className, label, readOnly, value, onChange }) => {
    const foldersCache = getFoldersCache();
    const folderItems = Object.keys(foldersCache).map(id => {
        const name = foldersCache[id];
        return <MenuItem key={id} value={id}>{name}</MenuItem>;
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
                            <Chip key={value} label={foldersCache[value]}/>
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
