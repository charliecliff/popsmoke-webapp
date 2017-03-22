import { Component, OnInit, Inject } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from "angularfire2";

import { PacketPage } from '../packet/packet';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-launch',
  templateUrl: 'launch.html'
})
export class LaunchPage {

  constructor(public navCtrl: NavController, 
  						public modalCtrl: ModalController, 
  						public angularFire: AngularFire) { }
	
	ngOnInit() {

		// Tie this to the STATE STORE
    this.angularFire.auth.subscribe(data => {

      console.log("data");
      console.log(data);
      if (data) {
      	this.setRootMainController();
      } else {
        this.pushLoginController();
      }
    });
	}
 	
 	setRootMainController() {
 		this.navCtrl.setRoot(PacketPage);
 	}

 	pushLoginController() {
    this.navCtrl.push(LoginPage);
  }
}
