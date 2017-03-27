import { Injectable, OnInit } from '@angular/core';
import { Http, 
         Headers, 
         Response, 
         ResponseContentType, 
         RequestOptions } from '@angular/http';
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
      this.getHolidaysForUser(user).subscribe(
        function (x) {
        console.log('Next: %s', x);
      });

    });
  }

	getHolidaysForUser(user): Observable<Holiday[]> {
    let headers = new Headers({"Content-Type": "application/json"});
    return this.http.get(this.holidayUrl, {headers: headers})
                    .map(this.parseHolidaysFromResponse)
                    .catch(this.handleError);
  }

  private parseHolidaysFromResponse(res: Response) {
    console.log("parseHolidaysFromResponse\n" + res);
    return [];
  }

  private handleError(error) {
    console.log("handleError: " + error);
  	return Observable.throw('Server error');
  }
}