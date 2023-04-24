import { describeDate, exportedForTesting } from "./DateUtils";

const { msSince, minutesSince, hoursSince, daysSince, weeksSince, monthsSince } = exportedForTesting;

describe("time since", () => {
    const d = new Date("21 November 2022 01:00:00");

    test("milliseconds", () => {
        const d1 = new Date("21 November 2022 01:00:50");
        expect(msSince(d, d1)).toBe(50000);
    });

    test("minutes", () => {
        const d1 = new Date("21 November 2022 01:06:00");
        expect(minutesSince(d, d1)).toBe(6);
        const d2 = new Date("21 November 2022 01:48:00");
        expect(minutesSince(d, d2)).toBe(48);
    });

    test("hours", () => {
        const d1 = new Date("21 November 2022 03:00:00");
        expect(hoursSince(d, d1)).toBe(2);
    });

    test("days", () => {
        const d1 = new Date("25 November 2022 03:00:00");
        expect(daysSince(d, d1)).toBe(4);
    });

    test("weeks", () => {
        const d1 = new Date("26 December 2022 03:00:00");
        expect(weeksSince(d, d1)).toBe(5);
    });

    test("months", () => {
        const d1 = new Date("21 February 2023 01:00:00");
        expect(monthsSince(d, d1)).toBe(3);
    });
});

describe("describing data", () => {
    const d = new Date("21 November 2022 01:00:00");

    test("less than a minute ago", () => {
        const d1 = new Date("21 November 2022 01:00:50");
        expect(describeDate(d, d1)).toBe("Less than a minute ago");
    });

    test("1 minute ago", () => {
        const d1 = new Date("21 November 2022 01:01:50");
        expect(describeDate(d, d1)).toBe("1 minute ago");
    });

    test("2 minutes ago", () => {
        const d1 = new Date("21 November 2022 01:02:50");
        expect(describeDate(d, d1)).toBe("2 minutes ago");
    });

    test("59 minutes ago", () => {
        const d1 = new Date("21 November 2022 01:59:59");
        expect(describeDate(d, d1)).toBe("59 minutes ago");
    });

    test("1 hour ago", () => {
        const d1 = new Date("21 November 2022 02:00:00");
        expect(describeDate(d, d1)).toBe("1 hour ago");
    });

    test("2 hours ago", () => {
        const d1 = new Date("21 November 2022 03:00:00");
        expect(describeDate(d, d1)).toBe("2 hours ago");
    });

    test("23 hours ago", () => {
        const d1 = new Date("22 November 2022 00:00:00");
        expect(describeDate(d, d1)).toBe("23 hours ago");
    });

    test("yesterday", () => {
        const d1 = new Date("22 November 2022 01:00:00");
        expect(describeDate(d, d1)).toBe("Yesterday");
    });

    test("2 days ago", () => {
        const d1 = new Date("23 November 2022 01:00:00");
        expect(describeDate(d, d1)).toBe("2 days ago");
    });

    test("6 days ago", () => {
        const d1 = new Date("27 November 2022 01:00:00");
        expect(describeDate(d, d1)).toBe("6 days ago");
    });

    test("last week", () => {
        const d1 = new Date("28 November 2022 01:00:00");
        expect(describeDate(d, d1)).toBe("Last week");
    });

    test("2 weeks ago", () => {
        const d1 = new Date("5 December 2022 01:00:00");
        expect(describeDate(d, d1)).toBe("2 weeks ago");
    });

    test("2 weeks ago", () => {
        const d1 = new Date("5 December 2022 01:00:00");
        expect(describeDate(d, d1)).toBe("2 weeks ago");
    });

    test("last month", () => {
        const d1 = new Date("19 December 2022 01:00:00");
        expect(describeDate(d, d1)).toBe("Last month");
    });

    test("2 months ago", () => {
        const d1 = new Date("21 January 2023 01:00:00");
        expect(describeDate(d, d1)).toBe("2 months ago");
    });
});
