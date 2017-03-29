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
    firstName: string;  
    lastName: string;
    middleInitial: string;
    ssn: string;
    rank: string;
    phoneNumber: string;

  constructor(data = {}) {
  	this.firstName = data["firstName"];
    this.lastName = data["lastName"];
    this.middleInitial = data["middleInitial"];
    this.ssn = data["ssn"];
    this.rank = data["rank"];
    this.phoneNumber = data["phoneNumber"];
  }
}
