export default function isNonNullObject(value) {
    return typeof value === 'object' && value !== null;
}
