import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, Slides } from 'ionic-angular';
import * as PSModels from '../../models';
import * as PSState from '../../reducers';
import * as PSActions from '../../reducers/packets-reducer';
import * as PSValidators from '../../validators';
import * as Providers from '../../providers';

import * as da31BuilderActions from '../../actions/da31builder.actions';

enum packetForm {
    kBioForm = 0,
    kStationForm,
    kDestinationForm,
    kLeaveForm
}

@Component({
  templateUrl: 'packet.html',
  providers: [Providers.DA31Provider]
})
export class PacketPage {

  currentPacket: PSModels.Packet;
  
  @ViewChild(Slides) slides: Slides;

  bioForm: FormGroup;
  stationForm: FormGroup;
  destinationForm: FormGroup;
  
  // Leave Form and Dependant Validations
  leaveStartDate: Number = 0;
  hasMinLeaveDays: boolean = false;
  leaveForm: FormGroup;
  
  // UX State
  submitTried: boolean = false;
  packetID: string = "1";
  currentForm: packetForm = packetForm.kBioForm;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private store: PSState.Store<PSState.AppState>,
              private da31Provider: Providers.DA31Provider) {

    console.log("Holiday Selected: " + JSON.stringify(navParams["packet"]) );

    this.packetID = "new";
    this.store.select("packets").subscribe(this.packetsCallback);
    this.bioFormConstructor();
    this.stationFormConstructor();
    this.destinationFormConstructor();
    this.leaveFormConstructor();
    this.observeLeaveForm();
  }
  
  ionViewWillEnter() {
    this.slides.lockSwipes(true);
  }

  pop() {
    console.log("pop");
    this.navCtrl.pop({animate: false});
  }

  back() {
    this.scollToBackPrevious();
  }

  next() {
    this.scrollToNextSlide();
  }
  
  private bioFormConstructor() {
    let firstNameValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.bio.firstName;
    let midInitialValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.bio.middleInitial;
    let lastNameValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.bio.lastName;
    let ssnValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.bio.ssn;
    let rankValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.bio.rank;
    let phoneValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.bio.phoneNumber;

    this.bioForm = this.formBuilder.group({
      firstName: [firstNameValue, PSValidators.firstNameValidators()],
      middleInitial: [midInitialValue, PSValidators.middleInitialValidators()],
      lastName: [lastNameValue, PSValidators.lastNameValidators()],
      ssn: [ssnValue, PSValidators.ssnValidators()],
      rank: [rankValue, PSValidators.rankValidators()],
      phoneNumber: [phoneValue, PSValidators.phoneNumberValidators()],
    });
  }
  
  private updatePacketBio() {
    let value = this.bioForm.value;
    let action = new PSActions.SetBioAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private stationFormConstructor() {
    let platoonValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.station.platoon;
    let companyValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.station.company;
    let battalionValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.station.battalion;
    let brigadeValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.station.brigade;
    let divisionValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.station.division;
    let postValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.station.post;
    let stationZipValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.station.zip;
    let stationPhoneValue = (this.currentPacket == undefined) ? 
      "" : this.currentPacket.station.phoneNumber;

    this.stationForm = this.formBuilder.group({
      platoon: [platoonValue, PSValidators.stringValidators()],
      company: [companyValue, PSValidators.stringValidators()],
      battalion: [battalionValue, PSValidators.stringValidators()],
      brigade: [brigadeValue, PSValidators.stringValidators()],
      division: [divisionValue, PSValidators.stringValidators()],
      post: [postValue, PSValidators.stringValidators()],
      zip: [stationZipValue, PSValidators.stringValidators()],
      phoneNumber: [stationPhoneValue, PSValidators.phoneNumberValidators()],
    });
  }

  private updatePacketStation() {
    let value = this.stationForm.value;
    let action = new PSActions.SetStationsAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private destinationFormConstructor() {
    this.destinationForm = this.formBuilder.group({
      street: ["", PSValidators.streetValidators()],
      city: ["", PSValidators.cityValidators()],
      state: ["", PSValidators.stateValidators()],
      zip: ["", PSValidators.zipCodeValidators()]
    });
  }

  private updatePacketDestination() {
    let value = this.destinationForm.value;
    let action = new PSActions.SetDestinationAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private leaveFormConstructor() {
    this.leaveForm = this.formBuilder.group({
      leaveType: ["", PSValidators.leaveTypeValidators()],
      explanationOfLeaveType: [""], accruedLeave: [""], requestedLeave: [""], 
      advancedLeave: [""], excessLeave: [""],
      leaveDateFrom: ["", PSValidators.dateValidators()],
      leaveDateTo: ["", PSValidators.dateValidators()]
    });
  }

  private updateDA31Leave() {
    let value = this.leaveForm.value;
    let action = new PSActions.SetDA31LeaveAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private observeLeaveForm() {
    this.leaveForm.valueChanges.subscribe(this.leaveFormCallback);
  }

  private leaveFormCallback = (packets) => {
      let sum = this.leaveForm.controls["accruedLeave"].value +
      this.leaveForm.controls["requestedLeave"].value +
      this.leaveForm.controls["advancedLeave"].value +
      this.leaveForm.controls["excessLeave"].value;
      this.hasMinLeaveDays = (sum > 0);
  }

  private getCurrentFormGroup() {
    switch (this.currentForm) {
      case packetForm.kBioForm:
        return this.bioForm;
      case packetForm.kStationForm:
        return this.stationForm;
      case packetForm.kDestinationForm:
        return this.destinationForm;
      case packetForm.kLeaveForm:
        return this.leaveForm;
      default:
        break;
    }
    return undefined;
  }

  private updatePackWithCurrentFormGroup() {
    switch (this.currentForm) {
      case packetForm.kBioForm:
        this.updatePacketBio();
        break;
      case packetForm.kStationForm:
        this.updatePacketStation();
        break;
      case packetForm.kDestinationForm:
        this.updatePacketDestination();
        break;
      case packetForm.kLeaveForm:
        this.updateDA31Leave();
        break;
      default:
        break;
    }
  }
  
  private packetsCallback = (packets) => {
    this.currentPacket = packets[this.packetID];
  }

  private scollToBackPrevious() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.currentForm = Math.max(0, this.currentForm - 1);
  }

  private scrollToNextSlide() {
    this.submitTried = true;
    let currentFromGroup = this.getCurrentFormGroup();
    if (currentFromGroup.valid) { // TODO: Encapsulate Validation fo entire form in order to handle the cross-dependant validators
      this.updatePackWithCurrentFormGroup();
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.submitTried = false;
      this.currentForm = this.currentForm + 1;
      this.slides.lockSwipes(true);
    }
  }

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

  private submit() {
    let leaveInfo = this.currentPacket;

    console.log("this.currentPacket");
    console.log( Object.assign({},this.currentPacket) );

    // this.store.dispatch(new da31BuilderActions.AddPersonalInfoAction(this.currentPacket));

    // TODO: This is CONTROLLER Level logic and should be pulled into a service
    this.da31Provider.postDA31Form(leaveInfo).subscribe(data => {
      console.log("subcribe closure");
    });
  }
}
