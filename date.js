var moment = require("moment");

module.exports.getDate = function () {
    var currDay = moment().format('dddd, MMMM Do');
    return currDay;
}

module.exports.getTime = function () {
    var currTime = moment().format('hh:mm:ss');
    return currTime;
}