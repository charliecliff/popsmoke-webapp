import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  leaveForm: FormGroup;
  
  // State
  submitAttempt: boolean = false;
  currentPacketID: string = "1";
  currentForm: packetForm = packetForm.kBioForm;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private store: PSState.Store<PSState.AppState>) {
    this.currentPacketID = "new";
    this.store.select("packets").subscribe(this.packetsCallback);
    this.bioFormConstructor();
    this.stationFormConstructor();
    this.destinationFormConstructor();
    this.leaveFormConstructor();
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
    this.bioForm = this.formBuilder.group({
      firstName: [this.currentPacket.bio.firstName, 
                  PSValidators.firstNameValidators()],
      middleInitial: [this.currentPacket.bio.middleInitial,
                      PSValidators.middleInitialValidators()],
      lastName: [this.currentPacket.bio.lastName, 
                 PSValidators.lastNameValidators()],
      ssn: [this.currentPacket.bio.ssn,
            PSValidators.ssnValidators()],
      rank: [this.currentPacket.bio.rank,
             PSValidators.rankValidators()],
      phone: [this.currentPacket.bio.phoneNumber,
              PSValidators.phoneNumberValidators()],
    });
  }

  private stationFormConstructor() {
    this.stationForm = this.formBuilder.group({
      stationPlatoonInput: ["", PSValidators.firstNameValidators()],
      stationCompanyInput: ["", PSValidators.firstNameValidators()],
      stationBattalionInput: ["", PSValidators.firstNameValidators()],
      stationBrigadeInput: ["", PSValidators.firstNameValidators()],
      stationDivisionInput: ["", PSValidators.firstNameValidators()],
      stationPostInput: ["", PSValidators.firstNameValidators()],
      stationZipInput: ["", PSValidators.firstNameValidators()],
      stationPhoneInput: ["", PSValidators.firstNameValidators()],
    });
  }

  private destinationFormConstructor() {
    this.destinationForm = this.formBuilder.group({
      streetInput: [''],
      cityInput: [''],
      stateInput: [''],
      zipInput: ['']
    });
  }

  private leaveFormConstructor() {
    this.leaveForm = this.formBuilder.group({
      leaveType: [""],
      explanationOfLeaveType: [""],
      accruedLeave: [""],
      requestedLeave: [""],
      advancedLeave: [""],
      excessLeave: [""],
      leaveDateFrom: [""],
      leaveDateTo: [""]
    });
  }

  private packetsCallback = (packets) => {
    let packet = PSModels.getPacketForID(packets, this.currentPacketID);
    this.currentPacket = Object.assign({}, packet);
    console.log("packetsCallback");
    console.log(packet);
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
    let action = new PSActions.SetBioAction(this.currentPacketID, 
                                            this.bioForm.value);
    this.store.dispatch( action );
  }

  private updatePacketStation() {
    let action = new PSActions.SetStationsAction(this.currentPacketID, 
                                                 this.stationForm.value);
    this.store.dispatch( action );
  }

  private updatePacketDestination() {
    let action = new PSActions.SetDestinationAction(this.currentPacketID, 
                                                    this.destinationForm.value);
    this.store.dispatch( action );
  }

  private updateAccruedLeave() {
    let action = new PSActions.SetAccruedLeaveAction(this.currentPacketID, 
                                                     this.leaveForm.value.accruedLeave);
    this.store.dispatch( action );
  }

  private updateAdvancedLeave() {
    let action = new PSActions.SetAdvancedLeaveAction(this.currentPacketID, 
                                                      this.leaveForm.value.advancedLeave);
    this.store.dispatch( action );
  }

  private updateExcessLeave() {
    let action = new PSActions.SetExcessLeaveAction(this.currentPacketID, 
                                                    this.leaveForm.value.excessLeave);
    this.store.dispatch( action );
  }

  private updateDepartureDate() {
    let action = new PSActions.SetDepartureDateAction(this.currentPacketID, 
                                                      this.leaveForm.value.departureDate);
    this.store.dispatch( action );
  }

  private updateReturnDate() {
    let action = new PSActions.SetReturnDateAction(this.currentPacketID, 
                                                   this.leaveForm.value.returnDate);
    this.store.dispatch( action );
  }
}
