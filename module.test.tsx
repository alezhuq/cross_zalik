import experience from "./experience";

describe("experience", () => {
    test("calculates the correct difference in days", () => {
        const inputDate = new Date("2022-01-01");
        const expectedDays = "514";

        const result = experience(inputDate);

        expect(result).toBe(expectedDays);
    });

    test("returns 0 when the input date is the same as today", () => {
        const today = new Date();
        const result = experience(today);

        expect(result).toBe("0");
    });
});
