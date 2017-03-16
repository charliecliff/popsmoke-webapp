import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Reducers from '../../reducers';

@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html'
})
export class PdfPage {

  private pdfUrl;
  private pdfUrlSubscription;

  constructor(public navCtrl: NavController, 
  						private store: Store<Reducers.AppState>) {
    this.pdfUrlSubscription = store.select('da31Form')
    															 .subscribe(da31Form => {
    															 	this.pdfUrl = da31Form;
    															 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPage');
  }

}
