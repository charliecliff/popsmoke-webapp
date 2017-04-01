import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from "angularfire2";

import * as MenuConstants from '../../config/menuConstants';

import { User } from '../../models/User';
import { Menu, MenuOption } from '../../models/Menu';

import * as Reducers from '../../reducers';

import { MainTabPage } from '../main-tab/main-tab';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-launch',
  templateUrl: 'launch.html'
})
export class LaunchPage {

  public currentMenu: Menu;
  public currentUser: User;

  constructor(public navCtrl: NavController, 
  						public modalCtrl: ModalController, 
  						public angularFire: AngularFire,
              public store: Store<Reducers.AppState>) { }
	
	ngOnInit() {
    this.store.select('user').subscribe(user => {
      this.currentUser = user as User;
      this.pushController(this.currentUser, this.currentMenu);
    });
	}

  private pushController(user, menu) {
    this.navCtrl.popToRoot();
    // if ( user.userID == undefined ) {
    // this.navCtrl.push(LoginPage);
    // } else {
      this.navCtrl.push(MainTabPage);
    // }
  }
}
