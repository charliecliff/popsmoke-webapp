import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Store } from '@ngrx/store';

import * as Constants from '../config/menuConstants';
import * as Reducers from '../reducers';
import * as Pages from '../pages';

import { UserProvider } from '../providers/user-provider';
import { HolidayProvider } from '../providers/holiday-provider';
import { LaunchPage } from '../pages/launch/launch';
import { HomePage } from '../pages/home/home';

import { PersonalInfoProfilePage } from '../ux_user/personal-info-profile/personal-info-profile';
import { StationProfilePage } from '../ux_user/station-profile/station-profile';

@Component({
  templateUrl: 'app.html',
  providers: [ UserProvider, HolidayProvider ]
})
export class MyApp {

  @ViewChild('myNav') nav: NavController

  private selectedFormURL;
  private selectedFormURLSubscription;

  public menu = Constants.MENU;

  rootPage = HomePage;

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
    console.log("Sign Out");
    this.userProvider.logout();
  }

  selectMenuOption(option) {
    console.log("toggleMenuOption: " + JSON.stringify(option));
    if(option.name == Constants.PERSONAL_INFO_OPTION) {
      this.nav.push(PersonalInfoProfilePage);
      this.menu = Constants.MENU;     
    } else if(option.name == Constants.STATION_OPTION) {
      this.nav.push(StationProfilePage);
      this.menu = Constants.MENU;     
    } else {
      option.showingSubMenus = !option.showingSubMenus;
    }
  }

  isMenuOptionShown(option) {
  	return option.showingSubMenus;
  }
}
