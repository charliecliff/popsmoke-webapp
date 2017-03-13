import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class Da31Service {

  da31Url = "/api/da31";

  constructor(public http: Http) {
    console.log('Hello Da31 Provider');
  }

	postDa31FormData(form: string): Observable<{}> {
		console.log("postDa31FormData");
		
    let body = JSON.stringify({description: "todo"});
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.da31Url, body, {headers: headers})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    
    let body = res.json();
    console.log(body);
    return body.data || { };
  }

  handleError(error) {
  	console.error(error);
  	return Observable.throw(error.json().error || 'Server error');
  }
}
