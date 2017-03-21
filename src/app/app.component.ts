import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Store } from '@ngrx/store';

import * as Reducers from '../reducers';
import * as Pages from '../pages';
import { PacketPage } from '../pages/packet/packet';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('myNav') nav: NavController

  private selectedFormURL;
  private selectedFormURLSubscription;

  rootPage = PacketPage;

  constructor(public platform: Platform,
              private store: Store<Reducers.AppState>) {

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // this.selectedFormURLSubscription = store.select('selectedFormURL')
    //                              .subscribe(selectedFormURL => {
    //                                 if(selectedFormURL != null) {
    //                                   this.nav.push(Pages.PdfPage);
    //                                 }
    //                               });

  }
}
