import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; // Sanitizing the PDF URL: http://stackoverflow.com/questions/37927657/unsafe-value-used-in-a-resource-url-context-with-angular-2#_=_
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
              private sanitizer: DomSanitizer,
  						private store: Store<Reducers.AppState>) {

    this.pdfUrl = "https://docs.google.com/gview?embedded=true&url=https://s3-us-west-2.amazonaws.com/popsmoke/myarchive.pdf";
    this.pdfUrlSubscription = store.select('selectedFormURL')
                                 .subscribe(selectedFormURL => {
                                   this.pdfUrl = "https://docs.google.com/gview?embedded=true&url=https://s3-us-west-2.amazonaws.com/popsmoke/myarchive.pdf";
                                  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPage');
  }
}
