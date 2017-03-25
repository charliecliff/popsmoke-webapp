import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';
import { HolidayProvider } from '../../providers/holiday-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HolidayProvider]
})
export class HomePage {

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
  						public store: Store<AppState>,
  						public holidayService: HolidayProvider) { }

	ngOnInit() {

	}
}
