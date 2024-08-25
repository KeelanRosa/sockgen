const { countMain, countToe, countHeel, isValidCount } = require("./sock");

/**
 * Compare integers with approximation for rounding
 */
function toBeCloseToInt(actual, expected, variance = 1) {
    if (typeof actual !== "number" || typeof expected !== "number") {
        throw new TypeError("Must be of type number");
    }

    const pass = expected - variance <= actual && actual <= expected + variance;
    if (pass) {
        return {
            message: () =>
                `expected ${this.utils.printReceived(
                    actual,
                )} not to be close to ${this.utils.printExpected(expected)}`,
            pass: true,
        };
    } else {
        return {
            message: () =>
                `expected ${this.utils.printReceived(
                    actual,
                )} to be close to ${this.utils.printExpected(expected)}`,
            pass: false,
        };
    }
}
expect.extend({ toBeCloseToInt });

/*
Tests using numbers from existing patterns
When pattern gives sock size instead of foot size, size is multiplied by 1.25
TODO should test ease but that's the least likely to be defined in a sock pattern
    and functionally static for now anyway
*/
test("Main", () => {
    // Kii's Vanilla Sock (Sock)
    expect(countMain(36, 9)).toBeCloseToInt(64);

    // DK Vanilla Dutch Socks (DK)
    expect(countMain(28, 7.5)).toBeCloseToInt(42);
    expect(countMain(28, 8.5)).toBeCloseToInt(48);
    expect(countMain(28, 9.5)).toBeCloseToInt(54);

    // Vanilla Cupcake Socks (Worsted/Aran)
    expect(countMain(22, 6.5 * 1.25)).toBeCloseToInt(36);
    expect(countMain(22, 7.25 * 1.25)).toBeCloseToInt(40);
    expect(countMain(22, 8.75 * 1.25)).toBeCloseToInt(48);

    // I'm So Basic (Light Fingering)
    expect(countMain(40, 7)).toBeCloseToInt(57);
    expect(countMain(40, 8)).toBeCloseToInt(63);
    expect(countMain(40, 9)).toBeCloseToInt(72);
    expect(countMain(40, 10)).toBeCloseToInt(81);
});

test("Toes", () => {
    expect(countToe(64)).toBeCloseToInt(24);
    expect(countToe(countMain(36, 9))).toBeCloseToInt(24);

    expect(countToe(countMain(28, 7.5))).toBeCloseToInt(16);
    expect(countToe(countMain(28, 8.5))).toBeCloseToInt(18);
    expect(countToe(countMain(28, 9.5))).toBeCloseToInt(20);

    // More variation from original pattern allowed due to different toe styles
    expect(countToe(countMain(22, 6.5 * 1.25))).toBeCloseToInt(20, 6);
    expect(countToe(countMain(22, 7.25 * 1.25))).toBeCloseToInt(20, 6);
    expect(countToe(countMain(22, 8.57 * 1.25))).toBeCloseToInt(20, 6);

    expect(countToe(countMain(40, 7))).toBeCloseToInt(22, 10);
    expect(countToe(countMain(40, 8))).toBeCloseToInt(26, 10);
    expect(countToe(countMain(40, 9))).toBeCloseToInt(30, 10);
    expect(countToe(countMain(40, 10))).toBeCloseToInt(34, 10);
});

test("Heels", () => {
    expect(countHeel(66)).toEqual([11, 11]);
    expect(countHeel(64)).toEqual([11, 10]);
    expect(countHeel(62)).toEqual([10, 11]);
    expect(countHeel(60)).toEqual([10, 10]);
    expect(countHeel(countMain(36, 9))).toEqual([11, 10]);

    // Basically ignoring original patterns due to different heel styles, still using the numbers for test variety
    expect(countHeel(countMain(28, 7.5))).toEqual([7, 7]);
    expect(countHeel(countMain(28, 8.5))).toEqual([8, 8]);
    expect(countHeel(countMain(28, 9.5))).toEqual([9, 9]);

    expect(countHeel(countMain(22, 6.5 * 1.25))).toEqual([6, 6]);
    expect(countHeel(countMain(22, 7.25 * 1.25))).toEqual([7, 6]);
    expect(countHeel(countMain(22, 8.75 * 1.25))).toEqual([8, 8]);

    expect(countHeel(countMain(40, 7))).toEqual([9, 10]);
    expect(countHeel(countMain(40, 8))).toEqual([11, 10]);
    expect(countHeel(countMain(40, 9))).toEqual([12, 12]);
    expect(countHeel(countMain(40, 10))).toEqual([13, 14]);
});

/*
Check stitch counts
*/
test("Valid stitches", () => {
    expect(countMain(36, 9) % 2).toBe(0); // 259.2
    expect(countMain(7, 12, 1) % 2).toBe(0); // 21
    expect(countMain(14, 12, 1) % 2).toBe(0); // 42
    expect(countToe(72) % 2).toBe(0); // 27

    expect(isValidCount(60)).toBe(true);
    expect(isValidCount(60.0)).toBe(true);
    expect(isValidCount(65, false)).toBe(true);
    expect(() => isValidCount("a")).toThrow(TypeError);
    expect(() => isValidCount(0)).toThrow(RangeError);
    expect(() => isValidCount(-10)).toThrow(RangeError);
    expect(() => isValidCount(65)).toThrow(RangeError);
    expect(() => isValidCount(1.8)).toThrow(TypeError);
});
/*
Should fail validation
*/
test("Impossible patterns", () => {
    // Gauge errors
    expect(() => countMain(0, 9)).toThrow(RangeError);
    expect(() => countMain(-1, 9)).toThrow(RangeError);
    // Size errors
    expect(() => countMain(36, 0)).toThrow("circumference");
    expect(() => countMain(36, -1)).toThrow("circumference");
    // Main errors
    expect(() => countToe(0)).toThrow("stitch");
    expect(() => countToe(-1)).toThrow("stitch");
    expect(() => countHeel(-2)).toThrow("stitch");
    expect(() => countHeel(5)).toThrow("stitch");
    // Type errors
    expect(() => countMain("a", 9)).toThrow(TypeError);
    expect(() => countMain(36, "a")).toThrow(TypeError);
    expect(() => countMain(36, 9, "a")).toThrow(TypeError);
    expect(() => countToe("a")).toThrow(TypeError);
});
