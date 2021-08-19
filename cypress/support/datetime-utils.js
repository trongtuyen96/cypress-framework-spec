const moment = require('moment');

class DateTimeUtils {
    convertISOtoDateString(isoString){
        return moment(isoString).format('DD MMM YYYY, hh:mm A');
    }

    getCurrentDateTimeISO(){
        return new Date().toISOString();
    }
}

module.exports = DateTimeUtils;