/**
 * Generates a password with the specified parameters.
 * @param length the length of the password.
 * @param useCapitals if capitals should be included.
 * @param useDigits if numbers should be included
 * @param useSymbols if symbols should be included.
 * @returns {string} randomly generated password.
 */
export const generate = ({ length, useCapitals, useDigits, useSymbols }) => {
    const getChar = (chars) => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    };

    const vowels = "aeiou";
    const consonants = "bcdfghjklmnpqrstvwxyz";
    const numbers = "0123456789";
    const symbols = "@!$%&* ";

    let password = "";

    for (let i = 0; i < length; i++) {
        let chars = "";
        if (i % 2 === 0)
            chars = consonants;
        else if (useDigits && Math.random() < 0.10)
            chars = numbers;
        else if (useSymbols && Math.random() < 0.10)
            chars = symbols;
        else
            chars = vowels;

        if (useCapitals && Math.random() < 0.10)
            chars = chars.toUpperCase();

        password += getChar(chars);
    }

    return password;
};
