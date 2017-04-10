import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, NavParams, Slides } from 'ionic-angular';

import * as PSModels from '../../models';
import * as PSState from '../../reducers';
import * as PSActions from '../../reducers/packets-reducer';
import * as PSValidators from '../../validators';

enum packetForm {
    kBioForm = 0,
    kStationForm,
    kDestinationForm,
    kLeaveForm
}

@Component({
  templateUrl: 'packet.html'
})
export class PacketPage {

  currentPacket: PSModels.Packet;
  
  @ViewChild(Slides) slides: Slides;

  bioForm: FormGroup;
  stationForm: FormGroup;
  destinationForm: FormGroup;
  leaveStartDate: Number = 0;
  hasMinLeaveDays: boolean = false;
  leaveForm: FormGroup;
  
  // State
  submitAttempt: boolean = false;
  packetID: string = "1";
  currentForm: packetForm = packetForm.kLeaveForm;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private store: PSState.Store<PSState.AppState>) {
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
      phone: [phoneValue, PSValidators.phoneNumberValidators()],
    });

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
      stationZip: [stationZipValue, PSValidators.firstNameValidators()],
      stationPhone: [stationPhoneValue, PSValidators.phoneNumberValidators()],
    });
  }

  private destinationFormConstructor() {
    this.destinationForm = this.formBuilder.group({
      street: ["", PSValidators.streetValidators()],
      city: ["", PSValidators.cityValidators()],
      state: ["", PSValidators.stateValidators()],
      zip: ["", PSValidators.zipCodeValidators()]
    });
  }

  private leaveFormConstructor() {
    this.leaveForm = this.formBuilder.group({
      leaveType: ["", PSValidators.leaveTypeValidators()],
      explanationOfLeaveType: [""],
      accruedLeave: ["", PSValidators.leaveValidators()],
      requestedLeave: ["", PSValidators.leaveValidators()],
      advancedLeave: ["", PSValidators.leaveValidators()],
      excessLeave: ["", PSValidators.leaveValidators()],
      leaveDateFrom: ["", PSValidators.dateValidators()],
      leaveDateTo: ["", PSValidators.dateValidators()]
    });
  }

  private observeLeaveForm() {
    this.leaveForm.valueChanges.subscribe(data => {
      let sum = this.leaveForm.controls["accruedLeave"].value +
      this.leaveForm.controls["requestedLeave"].value +
      this.leaveForm.controls["advancedLeave"].value +
      this.leaveForm.controls["excessLeave"].value;
      this.hasMinLeaveDays = (sum > 0);
    });
  }

  private packetsCallback = (packets) => {
    this.currentPacket = PSModels.getCopyOfPacketForID(packets, this.packetID);
    console.log("packetsCallback");
    console.log(this.currentPacket);
  }

  private scollToBackPrevious() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.currentForm = Math.max(0, this.currentForm - 1);
  }

  private scrollToNextSlide() {
    this.submitAttempt = true;
    let currentFromGroup = this.getCurrentFormGroup();
    if (currentFromGroup.valid) {
      this.updatePackWithCurrentFormGroup();
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.submitAttempt = false;
      this.currentForm = this.currentForm + 1;
      this.slides.lockSwipes(true);
    }
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
        this.updateAdvancedLeave();
        this.updateAccruedLeave();
        this.updateExcessLeave();
        this.updateDepartureDate();
        this.updateReturnDate();
        break;
      default:
        break;
    }
  }

  private updatePacketBio() {
    let value = this.bioForm.value;
    let action = new PSActions.SetBioAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private updatePacketStation() {
    let value = this.stationForm.value;
    let action = new PSActions.SetStationsAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private updatePacketDestination() {
    let value = this.destinationForm.value;
    let action = new PSActions.SetDestinationAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private updateAccruedLeave() {
    let value = this.leaveForm.value.accruedLeave;
    let action = new PSActions.SetAccruedLeaveAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private updateAdvancedLeave() {
    let value = this.leaveForm.value.advancedLeave;
    let action = new PSActions.SetAdvancedLeaveAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private updateExcessLeave() {
    let value = this.leaveForm.value.excessLeave;
    let action = new PSActions.SetExcessLeaveAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private updateDepartureDate() {
    let value = this.leaveForm.value.departureDate;
    let action = new PSActions.SetDepartureDateAction(this.packetID, value);
    this.store.dispatch( action );
  }

  private updateReturnDate() {
    let value = this.leaveForm.value.returnDate;
    let action = new PSActions.SetReturnDateAction(this.packetID, value);
    this.store.dispatch( action );
  }
}
