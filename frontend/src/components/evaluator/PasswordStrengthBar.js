import React from "react";
import { LinearProgress } from "@mui/material";

/**
 * Displays a horizontal bar to visually display password strength.
 * @param strengthScore the password strength score.
 * @returns {JSX.Element}
 */
const PasswordStrengthBar = ({ strengthScore }) => {
    const backgroundColour = "grey";
    const getBarColour = (strengthScore) => {
        if (strengthScore <= 2) return "red";
        if (strengthScore === 3) return "yellow";
        if (strengthScore === 4) return "green";
    };
    const barValue = ((strengthScore + 1) / 5) * 100;
    return <LinearProgress variant="determinate"
                           value={(barValue)}
                           sx={{
                               backgroundColor: backgroundColour,
                               "& .MuiLinearProgress-bar": {
                                   backgroundColor: getBarColour(strengthScore)
                               }
                           }}/>;
};

export default PasswordStrengthBar;
