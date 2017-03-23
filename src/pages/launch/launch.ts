import { Component, OnInit, Inject } from '@angular/core';
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

  loginModal;

  constructor(public navCtrl: NavController, 
  						public modalCtrl: ModalController, 
  						public angularFire: AngularFire,
              public store: Store<Reducers.AppState>) { }
	
	ngOnInit() {

		// Tie this to the STATE STORE and the USER STATE
    this.angularFire.auth.subscribe(data => {
      if (data) {
        if(this.loginModal !== undefined) { this.loginModal.dismiss(); }
      	this.pushHomeController();
      } else {
        this.presentLoginController();
      }
    });

    this.store.select('error').subscribe(error => {
      
    });
	}
 	
 	pushHomeController() {
 		this.navCtrl.push(HomePage);
 	}

 	presentLoginController() {
    this.loginModal = this.modalCtrl.create(LoginPage);
    this.loginModal.present();
  }
}
