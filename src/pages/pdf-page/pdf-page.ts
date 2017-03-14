import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pdf-page',
  templateUrl: 'pdf-page.html'
})
export class PdfPage {

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    private store: Store<AppState>) {
  		
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPagePage');
  }

}
