/**
 * @fileoverview Defines a class for storing product information.
 */

import constants from '../../constants';
import moment from 'moment-timezone';

class Product {
    /**
     * @param {number} id ID of the emoji.
     * @param {number} size Font-size for the emoji in pixels.
     * @param {number} price Price of the emoji in cents.
     * @param {string} face Characters to make the emoji.
     * @param {string} date String representation of the date the emoji was
     *     added
     */
    constructor({id, size, price, face, date} = {}) {
       this.id_ = id;
       this.size_ = size;
       this.price_ = price;
       this.face_ = face;
       this.date_ = date;
    }

    /**
     * @returns {string} The date formatted for display.
     */
    getDisplayDate() {
        if (!this.date_) {
            return constants.UNKNOWN_VALUE;
        }

        const now = moment();
        const date = moment(this.date_);

        const ageInDays = now.diff(date, constants.Unit.DAYS);
        const ageInHours = now.diff(date, constants.Unit.HOURS);
        const ageInMinutes = now.diff(date, constants.Unit.MINUTES);
        const ageInSeconds = now.diff(date, constants.Unit.SECONDS);

        if (ageInDays > 7) {
            return date.format(constants.DateTimeFormat.OUTPUT);
        } else if (ageInDays === 1) {
            return `${ageInDays} ${constants.DateTimeFormat.DAY_AGO}`;
        } else if (ageInHours > 24) {
            return `${ageInDays} ${constants.DateTimeFormat.DAYS_AGO}`;
        } else if (ageInHours === 1) {
            return `${ageInHours} ${constants.DateTimeFormat.HOUR_AGO}`;
        } else if (ageInMinutes > 60) {
            return `${ageInHours} ${constants.DateTimeFormat.HOURS_AGO}`;
        } else if (ageInMinutes === 1) {
            return `${ageInMinutes} ${constants.DateTimeFormat.MINUTE_AGO}`;
        } else if (ageInSeconds > 60) {
            return `${ageInMinutes} ${constants.DateTimeFormat.MINUTES_AGO}`;
        } else if (ageInSeconds === 1) {
            return `${ageInSeconds} ${constants.DateTimeFormat.SECOND_AGO}`;
        } else if (ageInSeconds > 1) {
            return `${ageInSeconds} ${constants.DateTimeFormat.SECONDS_AGO}`;
        } else {
            return constants.DateTimeFormat.NOW;
        }
    }

    /**
     * @returns {string} String of characters arranged to look like a cute face.
     */
    getFace() {
        return this.face_;
    }

    /**
     * @returns {{font-size: string}} Object containing style information for an
     *     ng-style attribute.
     */
    getFaceStyle() {
        return {'font-size': this.getSizeInPx()};
    }

    /**
     * @returns {number} The ID of the product.
     */
    getId() {
        return this.id_;
    }

    /** @returns {number} The price of the emoji in cents. */
    getPriceInCents() {
        return this.price_;
    }

    /** @returns {number} The price of the emoji in dollars. */
    getPriceInDollars() {
        return this.getPriceInCents() / 100;
    }

    /** @returns {string} The price of the emoji in dollars for display. */
    getDisplayPrice() {
        return `$${this.getPriceInDollars().toFixed(2)}`;
    }

    /** @returns {number} The font-size of the emoji in pixels. */
    getSize() {
        return this.size_;
    }

    /** @returns {string} The font-size in pixels for CSS. */
    getSizeInPx() {
        return `${this.getSize()}px`;
    }
}

export default Product;
