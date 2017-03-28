import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/Rx';

import { AppState } from '../reducers';
import { Holiday } from '../models/Holiday';
import * as HolidayActions from '../reducers/holidays-reducer';

@Injectable()
export class HolidayProvider {

  // TODO: Move this into a config file
  holidayUrl = "https://sleepy-scrubland-83197.herokuapp.com/holidays";

  constructor(public http: Http, public store: Store<AppState>,) { 

    console.log("Holiday Provider Service");

    this.store.select("user").subscribe(user => {
      this.getHolidays("army", "2020-01-01");
    });
  }

	getHolidays(branch, thruDate) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let params: URLSearchParams = new URLSearchParams();
    params.set("branch", branch);
    params.set("thruDate", thruDate);
    options.search = params;
    this.http.get(this.holidayUrl, options)
             .map((res:Response) => res.json())
             .map(this.parseHolidaysFromResponse)
             .subscribe(this.updateHolidaysStateCallback,
                        this.handleErrorCallback);
  }

  private parseHolidaysFromResponse(res: Response) {
    return res["holidays"];
  }

  private updateHolidaysStateCallback = (holidaysArray) => {
    this.store.dispatch( new HolidayActions.SetHolidaysAction(holidaysArray));
  }

  private handleErrorCallback = (err) => {
    console.log("Holiday Error: " + JSON.stringify(err));
  }
}
