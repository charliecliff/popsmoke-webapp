//

export class User {
	firstName : string;
	lastName : string;

  constructor(data = {}) {
  	this.firstName = data["firstName"];
    this.lastName = data["lastName"];
  }
}
