/**
 * Determines whether the given target falls between the min and max.
 * @param {number} target The value in question.
 * @param {number} min The minimum value in the range in question.
 * @param {number} max The maximum value in the range in question.
 * @returns {boolean} Whether the given value is between or equal to the given
 *     minimum and the given maximum.
 */
function isInRange(target, min, max) {
    return min <= target && target <= max;
}

export default isInRange;
