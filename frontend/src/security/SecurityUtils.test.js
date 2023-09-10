import { encryptData, decryptData, generateHashes } from "./SecurityUtils";
import { setEncryptionKey } from "./EncryptionKeyUtils";

describe("checking hashes", () => {
    test("test hash", () => {
        expect(generateHashes("password", "salt")).toStrictEqual({
            "authHash": "Rc2UnS2N7VhSm4gclb3cuFojVR13Gi7nZZj+wW9J+cQ=",
            "encryptionHash": "71if0nX0B2rO5WSkYjo9yTwykxmc9KY2bO6Y11FSbnw="
        });
    });
});

describe("checking encryption", () => {
    test("test encryption and decryption", () => {
        setEncryptionKey("key");
        const plain = "test data";
        const encrypted = encryptData(plain);
        const decrypted = decryptData(encrypted);
        expect(decrypted).toBe(plain);
    });
});
