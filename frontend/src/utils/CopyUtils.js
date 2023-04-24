// Helper file to copy text to clipboard.

/**
 * Copies the specified text to the clipboard.
 * Adapted from https://heyitsvajid.hashnode.dev/how-to-programmatically-copy-to-the-clipboard-in-javascript
 * @param text the string to copy.
 */
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(successful, failed);
};

const successful = () => {
    console.log("Copy succeeded");
};

const failed = (err) => {
    console.error("Copy failed: ", err);
};

module.exports = { copyToClipboard };
