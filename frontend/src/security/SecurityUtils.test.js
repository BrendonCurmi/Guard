import { encryptData, decryptData, generateHashes } from "./SecurityUtils";
import { setEncryptionKey } from "./EncryptionKeyUtils";

describe("checking hashes", () => {
    test("test hash", () => {
        expect(generateHashes("password", "salt")).toStrictEqual({
            "authHash": "eGsQ0ssGbrXV+iCzoYlfaNggon4Rl8jJlX/9GT04osA=",
            "encryptionHash": "3ihm0szyQq0n4q/pzzZgZPCctMwObQhjnTsa2ZqWrNc="
        });
    });
});

describe("checking encryption", () => {
    test("test encryption", () => {
        setEncryptionKey("key");
        expect(encryptData("test data")).toBe("bW9iZEZEL1JCVXl3N2pNVTBzcGZEdz09JGpLejVGOU1OYmRhRHFBS3dMY1JGM3c9PQ==");
    });
});

describe("checking decryption", () => {
    test("test decryption", () => {
        setEncryptionKey("key");
        expect(decryptData("bW9iZEZEL1JCVXl3N2pNVTBzcGZEdz09JGpLejVGOU1OYmRhRHFBS3dMY1JGM3c9PQ==")).toBe("test data");
    });
});
