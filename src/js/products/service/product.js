import constants from '../../constants';
import moment from 'moment-timezone';

class Product {
    constructor({
        id = null,
        size = null,
        price = null,
        face = null,
        date = null,
    } = {}) {
       this.id_ = id;
       this.size_ = size;
       this.price_ = price;
       this.face_ = face;
       this.date_ = date;
    }

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

    getFace() {
        return this.face_;
    }

    getFaceStyle() {
        return {'font-size': this.getSizeInPx()};
    }

    getId() {
        return this.id_;
    }

    getPriceInCents() {
        return this.price_;
    }

    getPriceInDollars() {
        return (this.getPriceInCents() / 100).toFixed(2);
    }

    getDisplayPrice() {
        return `$${this.getPriceInDollars()}`;
    }

    getSize() {
        return this.size_;
    }

    getSizeInPx() {
        return `${this.getSize()}px`;
    }
}

export default Product;
