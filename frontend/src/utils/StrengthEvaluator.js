import zxcvbn from "zxcvbn";

/**
 * Checks the specified password.
 * @param pw the password.
 * @returns {JSON} result object.
 */
export const check = (pw) => {
    return zxcvbn(pw);
};

/**
 * Gets the score of the specified result.
 * @param result password result.
 * @returns {int} score from 0-4.
 */
export const getScore = (result) => {
    return result.score;
};

/**
 * Enum for password strength.
 * @type {{WEAK: string, MODERATE: string, STRONG: string}}
 */
export const PasswordStrength = {
    WEAK: "Weak",
    MODERATE: "Moderate",
    STRONG: "Strong"
};

/**
 * Gets the strength of the specified result object.
 * @param result password result.
 * @returns {string} strength of the password.
 */
export const getPasswordStrength = (result) => {
    switch (result.score) {
        default:
        case 0:
        case 1:
        case 2:
            return PasswordStrength.WEAK;
        case 3:
            return PasswordStrength.MODERATE;
        case 4:
            return PasswordStrength.STRONG;
    }
};

/**
 * Gets the feedback messages from the specified result.
 * @param result password result.
 * @returns {string} the complete feedback message.
 */
export const getMsg = (result) => {
    return (result.feedback.warning ? result.feedback.warning + ". " : "") + result.feedback.suggestions;
};

/**
 * Gets the pretty password crack time prediction.
 * @param result password result.
 * @returns {string} pretty time prediction.
 */
export const getCrackTime = (result) => {
    return result.crack_times_display.offline_slow_hashing_1e4_per_second;
};
