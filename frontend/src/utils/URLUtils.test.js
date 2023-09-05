import { encode, decode } from "./URLUtils";

describe("encoding for url", () => {
    test("simple", () => {
        expect(encode("folder")).toBe("folder");
    });

    test("space in name", () => {
        expect(encode("test folder")).toBe("test+folder");
    });

    test("http url", () => {
        expect(encode("http://localhost:8080/login")).toBe("http%3A%2F%2Flocalhost%3A8080%2Flogin");
    });
});

describe("decoding from url", () => {
    test("simple", () => {
        expect(decode("folder")).toBe("folder");
    });

    test("space in name", () => {
        expect(decode("test+folder")).toBe("test folder");
    });

    test("http url", () => {
        expect(decode("http%3A%2F%2Flocalhost%3A8080%2Flogin")).toBe("http://localhost:8080/login");
    });
});
