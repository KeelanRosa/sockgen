/**
 * Calculate foot/leg stitch count
 * @param {number} gauge - Knitting gauge in stitches per 4 inches/10 cm
 * @param {number} size - Foot circumference in inches
 * @param {number} ease
 * @todo Add more options for gauge/size
 */
function countMain(gauge, size, ease = 0.8) {
    for (let i of [gauge, size, ease]) {
        if (isNaN(parseFloat(i))) {
            throw new TypeError(`${i} is not a valid number`);
        }
    }
    if (gauge <= 0)
        throw new RangeError("The gauge must be greater than 0 stitches");
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
    if (isNaN(parseFloat(main))) {
        throw new TypeError(`${main} is not a valid number`);
    }
    if (main <= 0)
        throw new RangeError("The stitch count must be greater than 0");
    var base = main * 0.375;
    return Math.floor(base) % 2 == 0 ? Math.floor(base) : Math.floor(base) + 1;
}

module.exports = { countMain, countToe };
