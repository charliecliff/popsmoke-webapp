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
  public hours: string;

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
    let hourNumber = Math.floor( (t / (1000*60*60)  ) % 24 );
    this.hours = ('0' + hourNumber).slice(-2);
    let dayNumber  = Math.floor( (t / (1000*60*60*24))% 7 );
    this.days = ('0' + dayNumber).slice(-2);
    let weekNumber = Math.floor( (t / (1000*60*60*24*7)) );
    this.weeks = ('0' + weekNumber).slice(-2);
  }

}
