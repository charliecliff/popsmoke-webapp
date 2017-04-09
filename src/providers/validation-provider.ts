import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidationProvider {

  constructor(public http: Http) {
    console.log('Hello ValidationProvider Provider');
  }

  firstNameValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
  }
}
