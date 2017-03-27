import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Store } from '@ngrx/store';

import * as Reducers from '../reducers';
import * as Pages from '../pages';
import { UserProvider } from '../providers/user-provider';
import { LaunchPage } from '../pages/launch/launch';

import { HolidayProvider } from '../providers/holiday-provider';

@Component({
  templateUrl: 'app.html',
  providers: [ UserProvider ]
})
export class MyApp {

  @ViewChild('myNav') nav: NavController

  private selectedFormURL;
  private selectedFormURLSubscription;

  rootPage = LaunchPage;

  constructor(public platform: Platform,
              public store: Store<Reducers.AppState>,
              public userProvider: UserProvider,
              public holidayProvider: HolidayProvider) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  signOut() {
    this.userProvider.logout();
  }
}
