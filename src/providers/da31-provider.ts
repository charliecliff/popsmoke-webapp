import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as Models from '../models';
import * as DA31Constants from '../config/da31-constants';

@Injectable()
export class DA31Provider {

  da31Url = "https://sleepy-scrubland-83197.herokuapp.com/packet/5678/da31/create";

  constructor(public http: Http) { }

  postDA31Form(packet: Models.Packet): Observable<Blob> {

    let body = this.buildRequestBodyFromPacket(packet);

    let headers = new Headers({"Content-Type": "application/json"});
    let options = { headers: headers, responseType: ResponseContentType.Blob }
    return this.http.post(this.da31Url, body, options)
                    .map(this.extractPDFDataFromResponse)
                    .catch(this.handleError);
  }

  private buildRequestBodyFromPacket(packet: Models.Packet) {
    console.log("buildRequestBodyFromPacket");
    console.log("Packet");
    console.log( Object.assign({}, packet) );


    let body = {};
    body[DA31Constants.FIRST_NAME]        = packet.bio.firstName;
    body[DA31Constants.LAST_NAME]         = packet.bio.lastName;
    body[DA31Constants.MIDDLE_INITIAL]    = packet.bio.middleInitial;
    body[DA31Constants.SSN]               = packet.bio.ssn;
    body[DA31Constants.RANK]              = packet.bio.rank;
    body[DA31Constants.PHONE]             = packet.bio.phoneNumber;
    body[DA31Constants.PLATOON]           = packet.station.platoon;
    body[DA31Constants.COMPANY]           = packet.station.company;
    body[DA31Constants.BATTALION]         = packet.station.battalion;
    body[DA31Constants.BRIGADE]           = packet.station.brigade;
    body[DA31Constants.DIVISION]          = packet.station.division;
    body[DA31Constants.POST]              = packet.station.post;
    body[DA31Constants.STATION_ZIP]       = packet.station.zip;
    body[DA31Constants.STATION_PHONE]     = packet.station.phoneNumber;
    body[DA31Constants.STREET]            = packet.destination.street;
    body[DA31Constants.CITY]              = packet.destination.city;
    body[DA31Constants.STATE]             = packet.destination.state;
    body[DA31Constants.ZIP]               = packet.destination.zip;

    body[DA31Constants.TYPE_OF_LEAVE]     = packet.leave.leaveType;
    body[DA31Constants.LEAVE_EXPLANATION] = packet.leave.leaveExplanation;

    body[DA31Constants.ACCRUED_LEAVE] = packet.leave.accruedLeave == undefined 
      ? "0" : packet.leave.accruedLeave;
    body[DA31Constants.REQUESTED_LEAVE] = packet.leave.requestedLeave == undefined 
      ? "0" : packet.leave.requestedLeave;
    body[DA31Constants.ADVANCED_LEAVE] = packet.leave.advancedLeave == undefined 
      ? "0" : packet.leave.advancedLeave;
    body[DA31Constants.EXCESS_LEAVE] = packet.leave.excessLeave == undefined 
      ? "0" : packet.leave.excessLeave;

    // body[DA31Constants.LEAVE_START_DATE] = packet.leave.startDate;

    // body[DA31Constants.LEAVE_END_DATE]   = packet.leave.endDate;
    
    return JSON.stringify(body);
  }
  private extractPDFDataFromResponse(res: Response) {
    var pdfBlob = new Blob([res.blob()], {type: 'application/pdf'});
    return pdfBlob;
  }

  private handleError(error) {
  	return Observable.throw('Server error');
  }
}
