import emptyArray from './empty_array';


/**
 * Empty the recipient array, then copy the elements
 * of the donor array into the recipient array.
 * This allows the contents of one array to be copied
 * into another while preserving the recipient array's
 * reference
 * @param recipientArray
 * @param donorArray
 */
export default function copyArray(recipientArray, donorArray) {
    emptyArray(recipientArray);
    donorArray.forEach(function(donorValue) {
        recipientArray.push(donorValue);
    });
}