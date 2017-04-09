import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfileValidator provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserValidationProvider {

  constructor(public http: Http) {
    console.log('Hello ProfileValidator Provider');
  }

  firstNameValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
  }
}
