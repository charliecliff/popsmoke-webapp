import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class Da31Service {

  da31Url = "/api/da31";

  constructor(public http: Http) {
    console.log('Hello Da31 Provider');
  }

	postDa31FormData(form: string): Observable<Blob> {
		console.log("postDa31FormData");
		
    let body = JSON.stringify({description: "todo"});
    let headers = new Headers({"Content-Type": "application/json"});

    return this.http.post(this.da31Url, body, {headers: headers, responseType: ResponseContentType.Blob})
                    .map((res:Response) => res.blob())
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("extractData");
    console.log(res);
    return { };
  }

// (res:Response) => res.json()

  private extractPDFDataFromResponse(res: Response) {
    console.log("extractPDFDataFromResponse");
    console.log(res);
    return { };
  }

  handleError(error) {
  	console.log("error");
  	return Observable.throw('Server error');
  }
}
