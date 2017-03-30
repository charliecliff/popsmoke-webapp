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
export class Station {
    platoon: string;  
    company: string;
    battalion: string;
    brigade: string;
    division: string;
    post: string;
    zip: string;
    phoneNumber: string;

  constructor(data = {}) {
  	this.platoon = data["platoon"];
    this.company = data["company"];
    this.battalion = data["battalion"];
    this.brigade = data["brigade"];
    this.division = data["division"];
    this.post = data["post"];
    this.zip = data["zip"];
    this.phoneNumber = data["phoneNumber"];
  }
}
