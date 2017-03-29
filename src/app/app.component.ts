import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Store } from '@ngrx/store';

import * as Config from '../config';
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

  public menuOption = [Config.PROFILE_OPTION,
                       Config.POST_OPTION];

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

  menuOptionSelected(option) {
    console.log("menuOptionSelected");
    if(option == Config.PROFILE_OPTION) {
      this.nav.push(PersonalInfoProfilePage);      
    } else if(option == Config.POST_OPTION) {
      this.nav.push(StationProfilePage);
    }
  }
}
