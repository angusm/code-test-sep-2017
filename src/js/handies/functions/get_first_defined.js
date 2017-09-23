/**
 * Returns the first argument to the function that is not undefined
 * @returns {*}
 */
export default function getFirstDefined() {
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] !== 'undefined') {
            return arguments[i];
        }
    }
}