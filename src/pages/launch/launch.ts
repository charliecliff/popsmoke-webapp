import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from "angularfire2";

import * as Reducers from '../../reducers';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-launch',
  templateUrl: 'launch.html'
})
export class LaunchPage {

  constructor(public navCtrl: NavController, 
  						public modalCtrl: ModalController, 
  						public angularFire: AngularFire,
              public store: Store<Reducers.AppState>) { }
	
	ngOnInit() {
        this.pushLoginController();

		// // Tie this to the STATE STORE and the USER STATE
  //   this.angularFire.auth.subscribe(data => {
  //     this.navCtrl.popToRoot();
  //     if (data) { 
  //       this.pushHomeController();
  //     } else {
  //       this.pushLoginController();
  //     }
  //   });
	}
 	
 	pushHomeController() {
 		this.navCtrl.push(HomePage);
 	}

 	pushLoginController() {
    this.navCtrl.push(LoginPage);
  }
}
