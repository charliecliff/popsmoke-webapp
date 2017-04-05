/**
{
    "branch":"army",
    "startDate":"2019-01-01",
    "endDate":"2019-01-02",
    "photoURL":}
*/
var Holiday = (function () {
    function Holiday(data) {
        if (data === void 0) { data = {}; }
        this.name = data["name"];
        this.branch = data["branch"];
        this.photoURL = data["photoURL"];
        var startDateString = data["startDate"];
        if (startDateString != undefined) {
            this.startDate = new Date(startDateString);
            this.getTimeRemaining();
        }
        this.endDate = data["endDate"];
    }
    Holiday.prototype.getTimeRemaining = function () {
        var t = this.startDate.getTime() - (new Date()).getTime();
        var dayNumber = Math.floor((t / (1000 * 60 * 60 * 24)) % 7);
        this.days = dayNumber.toString();
        var weekNumber = Math.floor((t / (1000 * 60 * 60 * 24 * 7)));
        this.weeks = weekNumber.toString();
    };
    return Holiday;
}());
export { Holiday };
//# sourceMappingURL=Holiday.js.map