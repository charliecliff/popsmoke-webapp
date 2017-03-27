//

export class User {
	firstName : string;
	lastName : string;
	public userID: string;

  constructor(data = {}) {
  	this.userID = data["userID"];
  	this.firstName = data["firstName"];
    this.lastName = data["lastName"];
  }
}
