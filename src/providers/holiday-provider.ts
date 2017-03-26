import { Injectable, OnInit } from '@angular/core';
import { Http, 
         Headers, 
         Response, 
         ResponseContentType, 
         RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

import { AppState } from '../reducers';
import { Holiday } from '../models/Holiday';

@Injectable()
export class HolidayProvider {

  holidayUrl = "https://sleepy-scrubland-83197.herokuapp.com/user/holiday";

  constructor(public http: Http, public store: Store<AppState>,) { }

  ngOnInit() {
		this.store.select("user").subscribe(user => {
			this.getHolidaysForUser(user);
	  });
	}

	getHolidaysForUser(user): Observable<Holiday[]> {
		let getUserURL = this.holidayUrl + "/" + user["userID"];
    let headers = new Headers({"Content-Type": "application/json"});
    return this.http.get(getUserURL, {headers: headers})
                    .map(this.parseHolidaysFromResponse)
                    .catch(this.handleError);
  }

  private parseHolidaysFromResponse(res: Response) {
    return [];
  }

  private handleError(error) {
  	return Observable.throw('Server error');
  }
}