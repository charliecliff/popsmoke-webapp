import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as Models from '../models';

@Injectable()
export class Da31Service {

  da31Url = "https://sleepy-scrubland-83197.herokuapp.com/api/da31";

  constructor(public http: Http) {}

	postDa31FormData(form): Observable<Blob> {		
    let body = JSON.stringify(form);
    console.log("Body\n");
    console.log(body);
    let headers = new Headers({"Content-Type": "application/json"});
    return this.http.post(this.da31Url, body, {headers: headers, responseType: ResponseContentType.Blob})
                    .map(this.extractPDFDataFromResponse)
                    .catch(this.handleError);
  }

  private extractPDFDataFromResponse(res: Response) {
    var pdfBlob = new Blob([res.blob()], {type: 'application/pdf'});
    // var filename = 'file.pdf';
    // saveAs(pdfBlob, filename);
    return pdfBlob;
  }

  handleError(error) {
  	console.log("error");
  	return Observable.throw('Server error');
  }
}
