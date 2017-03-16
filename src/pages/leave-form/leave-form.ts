import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Models from '../../models';
import * as Reducers from '../../reducers';

// Views
import { PdfPage } from '../pdf/pdf';

// Providers
import { Da31Service } from '../../providers/da31.service';

@Component({
  selector: 'page-leave-form',
  templateUrl: 'leave-form.html',
  providers: [Da31Service]
})
export class LeaveFormPage 
{
	SUBMIT_BUTTON_TITLE	: string	= "SUBMIT";

  PAGE_TITLE  : string      = "LEAVE";
	ACCRUED_LEAVE	: string    = "ACCRUED";
	REQUESTED_LEAVE	: string  = "REQUESTED";
	ADVANCED_LEAVE	: string  = "ADVANCED";
	EXCESS_LEAVE	: string    = "EXCESS";
	LEAVE_DATE_FROM	: string  = "FROM";
	LEAVE_DATE_TO	: string    = "TO";

  public form;
  private formSubscription;

  constructor(private formBuilder: FormBuilder,
              private navCtrl: NavController, 
              private store: Store<Reducers.AppState>,
              private da31Service: Da31Service) {
    this.formSubscription = store.select('da31Form')
                                 .subscribe(da31Form => {
                                    this.form = da31Form;
                                  });
  }

  submit() {
    // TO DO: This is CONTROLLER Level logic and should be pulled into a service
    this.da31Service.postDa31FormData(this.form)
                    .subscribe(data => {
                      console.log("subcribe closure");
                    });
    this.navCtrl.push(PdfPage);
  }
}
