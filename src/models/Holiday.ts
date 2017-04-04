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

  public weeks: string;
  public days: string;

  constructor(data = {}) {
    this.name = data["name"];
    this.branch = data["branch"];
    this.photoURL = data["photoURL"];

    let startDateString = data["startDate"];
    if(startDateString != undefined) {
      this.startDate = new Date(startDateString);
      this.getTimeRemaining();
    }

    this.endDate = data["endDate"];
  }

  private getTimeRemaining() {
    let t = this.startDate.getTime() - (new Date()).getTime();
    let dayNumber  = Math.floor( (t / (1000*60*60*24))% 7 );
    this.days = dayNumber.toString();
    let weekNumber = Math.floor( (t / (1000*60*60*24*7)) );
    this.weeks = weekNumber.toString();
  }
}
