import { Injectable, OnInit } from '@angular/core';
import { Http, 
         Headers, 
         Response, 
         ResponseContentType, 
         RequestOptions,
         URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { AppState } from '../reducers';
import { Holiday } from '../models/Holiday';

@Injectable()
export class HolidayProvider {

  holidayUrl = "https://sleepy-scrubland-83197.herokuapp.com/holidays";

  constructor(public http: Http, public store: Store<AppState>,) { 

    console.log("Holiday Provider Service");

    this.store.select("user").subscribe(user => {
      console.log("subscribing to user");
      this.getHolidays("army", "2020-01-01").subscribe(
        function (x) {
          console.log('Next: %s', x);
       });
    });
  }

	getHolidays(branch, thruDate): Observable<Holiday[]> {

    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let params: URLSearchParams = new URLSearchParams();
    params.set("branch", branch);
    params.set("thruDate", thruDate);
    options.search = params;
    return this.http.get(this.holidayUrl, options)
                    .map(this.parseHolidaysFromResponse)
                    .catch(this.handleError);
  }

  private parseHolidaysFromResponse(res: Response) {
    console.log("Holiday Response: " + res);
    return [];
  }

  private handleError(error) {
    console.log("Holiday Error: " + error);
  	return Observable.throw('Server error');
  }
}