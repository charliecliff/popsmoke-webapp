import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Store } from '@ngrx/store';

import * as Constants from '../config/menuConstants';
import * as Reducers from '../reducers';
import * as Pages from '../pages';



import { Menu } from '../models/Menu';

import * as menuReducer from '../reducers/menu-reducer';

import { UserProvider } from '../providers/user-provider';
import { HolidayProvider } from '../providers/holiday-provider';

import { LaunchPage } from '../pages/launch/launch';
import { PacketPage } from '../pages/packet/packet';


@Component({
  templateUrl: 'app.html',
  providers: [ UserProvider, HolidayProvider ]
})
export class MyApp {

  @ViewChild('myNav') nav: NavController

  public menu: Menu;

  rootPage = PacketPage;

  constructor(public platform: Platform,
              public store: Store<Reducers.AppState>,
              public userProvider: UserProvider,
              public holidayProvider: HolidayProvider) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.store.select("menu").subscribe(menu => {
      this.menu = menu as Menu;
    });
  }

  signOut() {
    this.userProvider.logout();
  }

  selectMenuOption(option) {
    this.store.dispatch(new menuReducer.SelectMenuOptionAction( option.name ));
  }
}
