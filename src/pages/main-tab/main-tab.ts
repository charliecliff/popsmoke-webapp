import { Component, OnInit, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as MenuConstants from '../../config/menuConstants';
import * as Reducers from '../../reducers';
import { Menu } from '../../models/Menu';

import { PersonalInfoProfilePage } from '../../ux_user/personal-info-profile/personal-info-profile';
import { HomePage } from '../home/home';
import { DocumentsPage } from '../documents/documents';
import { PacketHistoryPage } from '../packet-history/packet-history';
import { InboxPage } from '../inbox/inbox';

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

  constructor(public store: Store<Reducers.AppState>) {     
  	this.tab1 = PersonalInfoProfilePage;
    this.tab2 = DocumentsPage;
    this.tab3 = HomePage;
    this.tab4 = PacketHistoryPage;
    this.tab5 = InboxPage;
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
       case MenuConstants.DOCUMENTS_OPTION:
         this.tabRef.select(1);
         break;
       case MenuConstants.HOLIDAYS_OPTION:
         this.tabRef.select(2);
         break;
       case MenuConstants.PACKETS_OPTION:
         this.tabRef.select(3);
         break;
       case MenuConstants.INBOX_OPTION:
         this.tabRef.select(4);
         break;
       default:
         this.tabRef.select(2);
         break;
     }
  }
}
