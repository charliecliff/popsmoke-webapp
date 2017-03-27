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
      this.getHolidays("army", "2020-01-01");
    });
  }

	getHolidays(branch, thruDate) {
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
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
    console.log("Holiday Response: " + res);
    return [];
  }

  private updateHolidaysStateCallback = (holidaysArray) => {
  }

  private handleErrorCallback = (err) => {
    console.log("Holiday Error: " + JSON.stringify(err));
  }
}