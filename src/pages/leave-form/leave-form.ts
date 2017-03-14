import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the LeaveForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-leave-form',
  templateUrl: 'leave-form.html'
})
export class LeaveFormPage {

	PAGE_TITLE	: string					= "LEAVE";
	SUBMIT_BUTTON_TITLE	: string	= "SUBMIT";

	ACCRUED_LEAVE	: string		= "ACCRUED";
	REQUESTED_LEAVE	: string	= "REQUESTED";
	ADVANCED_LEAVE	: string	= "ADVANCED";
	EXCESS_LEAVE	: string		= "EXCESS";
	LEAVE_DATE_FROM	: string	= "FROM";
	LEAVE_DATE_TO	: string		= "TO";

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private store: Store<AppState>,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveFormPage');
  }

  submit() {

    $completedFormData = this.store.da31Form;
    console.log($completedFormData);
    
    // this.da31Service.postDa31FormData("test").subscribe(data => {
    //   console.log("fuck you");
    //   console.log(data);
    //   console.log("subcribe closure");
    // });
  }
}
