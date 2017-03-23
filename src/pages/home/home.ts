import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService]
})
export class HomePage {

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams, 
  						public authService: AuthService) {}

  signout() {
  	this.authService.logOut();    
  }
}
