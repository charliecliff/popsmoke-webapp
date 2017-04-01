import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Reducers from '../../reducers';
import { User } from '../../models/User';
import { MainTabPage } from '../main-tab/main-tab';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-launch',
  templateUrl: 'launch.html'
})
export class LaunchPage {

  constructor(public navCtrl: NavController, 
              public store: Store<Reducers.AppState>) { }
	
	ngOnInit() {
    this.store.select('user').subscribe(user => {
      this.pushController(user as User);
    });
	}

  private pushController(user) {
    this.navCtrl.popToRoot();
    if ( user.userID == undefined ) {
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(MainTabPage);
    }
  }
}
