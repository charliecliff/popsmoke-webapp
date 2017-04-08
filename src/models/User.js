//
import { PersonalInfo } from './PersonalInfo';
import { Station } from './Station';
var User = (function () {
    function User(data) {
        if (data === void 0) { data = {}; }
        this.userID = data["userID"];
        this.firstName = data["firstName"];
        this.lastName = data["lastName"];
        this.personalInfo = new PersonalInfo({ "firstName": "FIRST NAME",
            "lastName": " ",
            "middleInitial": " ",
            "ssn": "",
            "rank": "",
            "phoneNumber": "" });
        this.station = new Station({ "platoon": "",
            "company": "",
            "battalion": "",
            "brigade": "",
            "division": "",
            "post": "",
            "zip": "",
            "phoneNumber": "" });
    }
    return User;
}());
export { User };
//# sourceMappingURL=User.js.map