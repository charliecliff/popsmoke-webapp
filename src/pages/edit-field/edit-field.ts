import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-edit-field',
  templateUrl: 'edit-field.html'
})
export class EditFieldPage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditFieldPage');
  }

  pop() {
    this.navCtrl.pop();
  }
}
