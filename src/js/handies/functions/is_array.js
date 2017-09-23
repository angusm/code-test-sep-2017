export default function isArray(value) {
    return typeof value === 'object' && typeof value.length === 'number';
}