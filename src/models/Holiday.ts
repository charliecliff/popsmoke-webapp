/**
{
	"branch":"army",
	"startDate":"2019-01-01",
	"endDate":"2019-01-02",
	"photoURL":}
*/
export class Holiday {
	public name: string;
	public branch: string;
	public photoURL: string;
	public startDate: Date;
	public endDate: Date;

  constructor(data = {}) {
  	this.name = data["name"];
  	this.branch = data["branch"];
  	this.startDate = data["startDate"];
    this.endDate = data["endDate"];
    this.photoURL = data["photoURL"];
  }
}
