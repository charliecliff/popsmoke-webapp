/*
{
    "firstName": ,
    "lastName": ,
    "middleInitial": ,
    "ssn": ,
    "rank": ,
    "phoneNumber": ,
}
*/
var PersonalInfo = (function () {
    function PersonalInfo(data) {
        if (data === void 0) { data = {}; }
        this.firstName = data["firstName"];
        this.lastName = data["lastName"];
        this.middleInitial = data["middleInitial"];
        this.ssn = data["ssn"];
        this.rank = data["rank"];
        this.phoneNumber = data["phoneNumber"];
    }
    return PersonalInfo;
}());
export { PersonalInfo };
//# sourceMappingURL=PersonalInfo.js.map