/**
 * Return the parent class of the given class
 * @param classToCheck
 * @returns {Function}
 */
export default function getParentClass(classToCheck) {
    return classToCheck.prototype.__proto__.constructor;
}
