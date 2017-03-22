import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PdfPage } from '../pdf/pdf';
import { Da31Service } from '../../providers/da31.service';
import * as Reducers from '../../reducers';
import * as da31BuilderActions from '../../actions/da31builder.actions';

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
  TYPE_OF_LEAVE  : string   = "TYPE OF LEAVE";
  EXPLANATION_OF_TYPE_OF_LEAVE  : string = "EXPLANATION";
  ORDINARY  : string   = "ORDINARY";
  EMERGENCY  : string  = "EMERGENCY";
  PERMISSIVE  : string = "PERMISSIVE";
  TDY  : string        = "TDY";
  OTHER  : string      = "OTHER";

  private leaveInfoFormGroup: FormGroup;
  private form;
  private formSubscription;

  constructor(private formBuilder: FormBuilder,
              private navCtrl: NavController, 
              private store: Store<Reducers.AppState>,
              private da31Service: Da31Service) {

    this.leaveInfoFormGroup = formBuilder.group({
      leaveType: [""],
      explanationOfLeaveType: [""],
      accruedLeave: [""],
      requestedLeave: [""],
      advancedLeave: [""],
      excessLeave: [""],
      leaveDateFrom: [""],
      leaveDateTo: [""]
    });

    this.formSubscription = store.select('da31Form')
                                 .subscribe(da31Form => {
                                    this.form = da31Form;
                                  });
  }

  submit() {
    let leaveInfo = this.leaveInfoFormGroup.value;
    this.store.dispatch(new da31BuilderActions.AddPersonalInfoAction(leaveInfo));

    // TODO: This is CONTROLLER Level logic and should be pulled into a service
    this.da31Service.postDa31FormData(this.form).subscribe(data => {
      console.log("subcribe closure");
    });
    this.navCtrl.push(PdfPage);
  }
}
