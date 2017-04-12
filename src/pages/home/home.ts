import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import * as PSState from '../../reducers';
import * as PSActions from '../../reducers/packets-reducer';
import { HolidayProvider } from '../../providers/holiday-provider';
import { PacketPage } from '../packet/packet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HolidayProvider],
  animations:[
    trigger('visibleState', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('400ms ease-in-out')),
      transition('hidden => visible', animate('400ms ease-in-out'))
    ])
  ]
})
export class HomePage {

  public visibleState : string = "visible";

  public showsCloseIcon : boolean = false;

  public holidays: any;

  constructor(public navCtrl: NavController, 
  						public store: PSState.Store<PSState.AppState>,
  						public holidayProvider: HolidayProvider) { 
    this.holidayProvider.getHolidays("army", "2020-01-01");
  }

	ngOnInit() {
		this.store.select("holidays").subscribe(holidays => {
      this.holidays = holidays;
    });
	}

  ionViewWillEnter() {
    this.visibleState = 'visible';
    this.showsCloseIcon = false;
  }

  private holidaySelected(holiday) {
    this.showsCloseIcon = true;
    this.visibleState = this.visibleState === 'visible' ? 'hidden' : 'visible';
  }

  private animationDone(){
    if( this.visibleState === 'hidden' ) {
      this.navCtrl.push(PacketPage, {"packet": {}}, {animate: false});
    }
  }
}
