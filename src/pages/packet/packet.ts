import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Packet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'packet.html'
})
export class PacketPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

	tapEvent(input) {
		console.log(input);
		console.log('tap');
  }
}
