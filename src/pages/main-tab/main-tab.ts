import { Component, OnInit, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as MenuConstants from '../../config/menuConstants';
import * as Reducers from '../../reducers';
import { Menu } from '../../models/Menu';
import { PersonalInfoProfilePage } from '../../ux_user/personal-info-profile/personal-info-profile';
import { StationProfilePage } from '../../ux_user/station-profile/station-profile';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-main-tab',
  templateUrl: 'main-tab.html'
})
export class MainTabPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  tab5: any;
  tab6: any;
  tab7: any;

  constructor(public store: Store<Reducers.AppState>) {     
  	this.tab1 = PersonalInfoProfilePage;
    this.tab2 = StationProfilePage;
    this.tab3 = HomePage;
    this.tab4 = HomePage;
    this.tab5 = HomePage;
    this.tab6 = HomePage;
    this.tab7 = HomePage;
  }

  ngOnInit() {
    this.store.select("menu").subscribe(menu => {
      this.showSelectedTabed(menu as Menu);
    });
  }

  private showSelectedTabed(menu) {
    switch (menu.selectedOption) {
       case MenuConstants.BIO_OPTION:
         this.tabRef.select(0);
         break;
       case MenuConstants.STATION_OPTION:
         this.tabRef.select(1);
         break;
       case MenuConstants.DOCUMENTS_OPTION:
         this.tabRef.select(2);
         break;
       case MenuConstants.HOLIDAYS_OPTION:
         this.tabRef.select(3);
         break;
       case MenuConstants.PACKETS_OPTION:
         this.tabRef.select(4);
         break;
       case MenuConstants.REMINDERS_OPTION:
         this.tabRef.select(5);
         break;
       case MenuConstants.INBOX_OPTION:
         this.tabRef.select(6);
         break;
       default:
         this.tabRef.select(4);
         break;
     }
  }
}
