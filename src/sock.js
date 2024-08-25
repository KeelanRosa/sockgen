/**
 * Validate number of stitches
 * @param {number} count - Stitch count
 * @param {boolean} even - Whether stitch count must be even
 */
function isValidCount(count, even = true) {
    var n = parseFloat(count);
    if (isNaN(n) || !Number.isInteger(n)) {
        throw new TypeError(`${count} is not a valid integer`);
    }
    if (count <= 0 || (even && count % 2 != 0)) {
        throw new RangeError(`${count} is not a valid stitch count`);
    }
    return true;
}

/**
 * Calculate foot/leg stitch count
 * @param {number} gauge - Knitting gauge in stitches per 4 inches/10 cm
 * @param {number} size - Foot circumference in inches
 * @param {number} ease
 * @todo Add more options for gauge/size
 */
function countMain(gauge, size, ease = 0.8) {
    try {
        isValidCount(gauge, false);
    } catch (e) {
        throw e;
    }
    for (let i of [size, ease]) {
        if (isNaN(parseFloat(i))) {
            throw new TypeError(`${i} is not a valid number`);
        }
    }
    if (size <= 0)
        throw new RangeError(
            "The foot circumference must be greater than 0 inches",
        );
    var base = size * (gauge / 4) * ease;
    return Math.floor(base) % 2 == 0 ? Math.floor(base) : Math.floor(base) + 1;
}

/**
 * Calculate toe stitch count
 * @param {number} main - Main stitch count
 */
function countToe(main) {
    try {
        isValidCount(main);
    } catch (e) {
        throw e;
    }
    var base = main * 0.375;
    return Math.floor(base) % 2 == 0 ? Math.floor(base) : Math.floor(base) + 1;
}

/**
 * Calculate heel stitch count
 * @param {number} main - Main stitch count
 * @returns {Array} Number of stitches on each side and number of stitches in middle of heel
 */
function countHeel(main) {
    try {
        isValidCount(main);
    } catch (e) {
        throw e;
    }
    main /= 2; // heel only uses half the stitches
    var base = Math.floor(main / 3);
    switch (main % 3) {
        case 0: // evenly divide stitches
            return [base, base];
        case 1: // 1 extra stitch in middle
            return [base, base + 1];
        case 2: // 1 extra stitch on each side
            return [base + 1, base];
    }
}

module.exports = { countMain, countToe, countHeel, isValidCount };
