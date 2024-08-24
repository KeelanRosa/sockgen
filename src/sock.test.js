const sock = require('./sock');

/**
 * Compare integers with approximation for rounding
 */
function toBeCloseToInt(actual, expected, variance = 1) {
    if (typeof actual !== 'number' || typeof expected !== 'number') {
        throw new TypeError('Must be of type number');
    }

    const pass = expected - variance <= actual && actual <= expected + variance;
    if (pass) {
        return {
            message: () => 
            `expected ${this.utils.printReceived(actual
                )} not to be close to ${this.utils.printExpected(expected)}`,
            pass: true,
        };
    } else {
        return {
            message: () =>
            `expected ${this.utils.printReceived(actual
                )} to be close to ${this.utils.printExpected(expected)}`,
            pass: false,
        };
    }
}
expect.extend({toBeCloseToInt});

/*
Tests using numbers from existing patterns
When pattern gives sock size instead of foot size, size is multiplied by 1.25
TODO should test ease but that's the least likely to be defined in a sock pattern
    and functionionally static for now anyway
*/
test('Sock', () => {
    // Kii's Vanilla Sock
    expect(sock(36, 9)).toBeCloseToInt(64);
})
test('DK', () => {
    // DK Vanilla Dutch Socks
    expect(sock(28, 7.5)).toBeCloseToInt(42);
    expect(sock(28, 8.5)).toBeCloseToInt(48);
    expect(sock(28, 9.5)).toBeCloseToInt(54);
})
test('Worsted/Aran', () => {
    // Vanilla Cupcake Socks
    expect(sock(22, 6.5*1.25)).toBeCloseToInt(36);
    expect(sock(22, 7.25*1.25)).toBeCloseToInt(40);
    expect(sock(22, 8.75*1.25)).toBeCloseToInt(48);
})
test('Light', () => {
    // I'm So Basic
    expect(sock(40, 7)).toBeCloseToInt(57);
    expect(sock(40, 8)).toBeCloseToInt(63);
    expect(sock(40, 9)).toBeCloseToInt(72);
    expect(sock(40, 10)).toBeCloseToInt(81);
})

/*
Check even stitch counts
*/
test('Even stitches', () => {
    expect(sock(36, 9) % 2).toBe(0); // 259.2
    expect(sock(7, 12, 1) % 2).toBe(0); // 21
    expect(sock(14, 12, 1) % 2).toBe(0); // 42
})
/*
Should fail validation
*/
test('Impossible patterns', () => {
    // Gauge <= 0
    expect(() => { sock(0, 9); }).toThrow('gauge');
    expect(() => { sock(-1, 9); }).toThrow('gauge');
    // Size <= 0
    expect(() => { sock(36, 0); }).toThrow('circumference');
    expect(() => { sock(36, -1); }).toThrow('circumference');
    // Type errors
    expect(() => { sock('a', 9); }).toThrow(TypeError);
    expect(() => { sock(36, 'a'); }).toThrow(TypeError);
    expect(() => { sock(36, 9, 'a'); }).toThrow(TypeError);
})