import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as Models from '../models';

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

    return JSON.stringify(packet);
  }

  private extractPDFDataFromResponse(res: Response) {
    var pdfBlob = new Blob([res.blob()], {type: 'application/pdf'});
    return pdfBlob;
  }

  private handleError(error) {
  	return Observable.throw('Server error');
  }
}
