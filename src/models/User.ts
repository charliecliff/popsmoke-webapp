//
import { PersonalInfo } from './PersonalInfo';
import { Station } from './Station';

export class User {
	firstName : string;
	lastName : string;

	public userID: string;
	public personalInfo: PersonalInfo;
  public station: Station;

  constructor(data = {}) {
  	this.userID = data["userID"];
  	this.firstName  = data["firstName"];
    this.lastName   = data["lastName"];

    this.personalInfo = new PersonalInfo({ "firstName": "FIRST NAME",
    																			 "lastName": " ",
    																			 "middleInitial": " ",
    																			 "ssn": "",
    																			 "rank": "",
    																			 "phoneNumber": ""});

    this.station = new Station({  "platoon": "",
                                  "company": "",
                                  "battalion": "",
                                  "brigade": "",
                                  "division": "",
                                  "post": "",
                                  "zip": "",
                                  "phoneNumber": ""});
  }
}
