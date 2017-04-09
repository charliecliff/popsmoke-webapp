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
export class PersonalInfo {
    firstName: string     = "Edgar";  
    lastName: string      = "Burroughs";
    middleInitial: string = "R";
    ssn: string           = "5555";
    rank: string          = "PVT";
    phoneNumber: string   = "555-555-5555";

  constructor(data = {}) {
    if(data["firstName"] != undefined) {
      this.firstName = data["firstName"];
    }
    if(data["lastName"] != undefined) {
      this.lastName = data["lastName"];
    }
    if(data["middleInitial"] != undefined) {
      this.middleInitial = data["middleInitial"];
    }
    if(data["ssn"] != undefined) {
      this.ssn = data["ssn"];
    }
    if(data["rank"] != undefined) {
      this.rank = data["rank"];
    }
    if(data["phoneNumber"] != undefined) {
      this.phoneNumber = data["phoneNumber"];
    }
  }
}
