import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { PacketPage } from '../packet/packet';
import { AppState } from '../../reducers';
import { HolidayProvider } from '../../providers/holiday-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HolidayProvider]
})
export class HomePage {

  public holidays: any;

  constructor(public navCtrl: NavController, 
  						public store: Store<AppState>,
  						public holidayProvider: HolidayProvider) { 
    this.holidayProvider.getHolidays("army", "2020-01-01");
  }

	ngOnInit() {
		this.store.select("holidays").subscribe(holidays => {
      this.holidays = holidays;
    });
	}

  holidaySelected(holiday) {
    this.navCtrl.push(PacketPage, {"packet": {}});
  }

}
