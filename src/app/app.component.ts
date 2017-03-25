import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Store } from '@ngrx/store';

import * as Reducers from '../reducers';
import * as Pages from '../pages';
import { LaunchPage } from '../pages/launch/launch';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('myNav') nav: NavController

  private selectedFormURL;
  private selectedFormURLSubscription;

  rootPage = LaunchPage;

  constructor(public platform: Platform,
              public store: Store<Reducers.AppState>) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.store.select("user").subscribe(user => {

    });
    this.store.select("error").subscribe(error => {
      
    });
  }
}
