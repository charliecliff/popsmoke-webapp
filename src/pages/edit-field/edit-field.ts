import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-field',
  templateUrl: 'edit-field.html'
})
export class EditFieldPage {

  explanation: string;
  currentValue: string;


  constructor(public navCtrl: NavController, 
              public params: NavParams) { 
    // this.currentValue = params.get('current');
        this.currentValue = "temp";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditFieldPage');
  }

  pop() {
    this.navCtrl.pop();
  }
}
