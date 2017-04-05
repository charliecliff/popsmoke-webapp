//
import { PersonalInfo } from './PersonalInfo';
import { Station } from './Station';
var User = (function () {
    function User(data) {
        if (data === void 0) { data = {}; }
        this.userID = data["userID"];
        this.firstName = data["firstName"];
        this.lastName = data["lastName"];
        this.personalInfo = new PersonalInfo({ "firstName": "firstName",
            "lastName": "firstName",
            "middleInitial": "firstName",
            "ssn": "firstName",
            "rank": "firstName",
            "phoneNumber": "firstName" });
        this.station = new Station({ "platoon": "platoon",
            "company": "company",
            "battalion": "battalion",
            "brigade": "brigade",
            "division": "division",
            "post": "post",
            "zip": "zip",
            "phoneNumber": "phoneNumber" });
    }
    return User;
}());
export { User };
//# sourceMappingURL=User.js.map