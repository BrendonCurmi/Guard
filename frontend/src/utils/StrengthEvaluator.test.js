import { PasswordStrength, check, getPasswordStrength, getScore } from "./StrengthEvaluator";

describe("checking password score", () => {
    test("weak score", () => {
        expect(getScore(check("we"))).toBe(0);
    });

    test("weak score 1", () => {
        expect(getScore(check("weak"))).toBe(1);
    });

    test("weak score 2", () => {
        expect(getScore(check("weakPas"))).toBe(2);
    });

    test("weak score 3", () => {
        expect(getScore(check("weakPassw"))).toBe(3);
    });

    test("weak score 4", () => {
        expect(getScore(check("weakPass!\"£$%"))).toBe(4);
    });
});

describe("checking password strength", () => {
    test("weak strength 0", () => {
        expect(getPasswordStrength(check("we"))).toBe(PasswordStrength.WEAK);
    });

    test("weak strength 1", () => {
        expect(getPasswordStrength(check("weak"))).toBe(PasswordStrength.WEAK);
    });

    test("weak strength 2", () => {
        expect(getPasswordStrength(check("weakPas"))).toBe(PasswordStrength.WEAK);
    });

    test("moderate strength 3", () => {
        expect(getPasswordStrength(check("weakPassw"))).toBe(PasswordStrength.MODERATE);
    });

    test("strong strength 4", () => {
        expect(getPasswordStrength(check("weakPass!\"£$%"))).toBe(PasswordStrength.STRONG);
    });
});
