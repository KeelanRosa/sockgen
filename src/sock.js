/**
 * Calculate foot/leg stitch count
 * @param gauge - Knitting gauge in stitches per 4 inches/10 cm
 * @param size - Foot circumference in inches
 * @param ease
 * @todo Add more options for gauge/size
 */
function countMain(gauge, size, ease = 0.8) {
    var base = size * (gauge/4) * ease;
    return Math.floor(base) % 2 == 0 ? Math.floor(base) : Math.ceil(base);
}

module.exports = countMain;
