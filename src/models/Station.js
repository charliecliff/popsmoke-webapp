/*
{
    "platoon": ,
    "company": ,
    "battalion": ,
    "brigade": ,
    "division": ,
    "post": ,
    "zip": ,
    "phone": ,
}
*/
var Station = (function () {
    function Station(data) {
        if (data === void 0) { data = {}; }
        this.platoon = data["platoon"];
        this.company = data["company"];
        this.battalion = data["battalion"];
        this.brigade = data["brigade"];
        this.division = data["division"];
        this.post = data["post"];
        this.zip = data["zip"];
        this.phoneNumber = data["phoneNumber"];
    }
    return Station;
}());
export { Station };
//# sourceMappingURL=Station.js.map