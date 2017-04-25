import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AuthProvider {

  baseAuthUrl: string = "https://sleepy-scrubland-83197.herokuapp.com/auth/";

  constructor(public http: Http) { }

  // This function is the first step in the PopSmoke Loging Process. We will 
  // either:
  // A) Register a New User for the Entered Phone Number, at which point we will
  //    create a 6 Digit Passcode that can be used in order to Login 
  // B) Fetch an existing User and update the 6 Digit Passcode that can be used 
  //    in order to Login 
  setPassCodeForPhoneNumber(phoneNumber) {
    console.log("resetPassCodeForPhoneNumber");
    
    let resetPassCodeURL = this.baseAuthUrl + "resetpasscode/" + phoneNumber;
    let headers = new Headers({"Content-Type": "application/json"});
    this.http.post(resetPassCodeURL, {headers: headers})
             .map((res:Response) => res.json())
             .subscribe();
  }

  // Login Function that uses a Phone Number and a 6 Digit Passcode
  login(phoneNumber, passCode) {
    console.log("login");

    let loginURL = this.baseAuthUrl + "login";
    let headers = new Headers({"Content-Type": "application/json"});

    let body = JSON.stringify({"userID": "8888888888", "password": "444444"});
    
    this.http.post(loginURL, body, {headers: headers, withCredentials: true})
             // .map((res:Response) => res.json())
             .subscribe(this.updateSessionStateCallback, 
                        this.handleErrorCallback);
  }

  logout() {
    console.log("logout");
    let logoutURL = this.baseAuthUrl + "logout";
    let headers = new Headers({"Content-Type": "application/json"});
    this.http.post(logoutURL, {headers: headers})
             .map((res:Response) => res.json())
             .subscribe();
  }

  // Logout Function which is intended to Burn the current Session
  verifyAuthorization() {
    console.log("logout");
    let logoutURL = this.baseAuthUrl + "test";
    let headers = new Headers({"Content-Type": "application/json"});
    this.http.get(logoutURL, {headers: headers})
             .map((res:Response) => res.json())
             .subscribe(this.updateSessionStateCallback,
                        this.handleErrorCallback);
  }

  private handleErrorCallback = (err) => {
    console.log("PopSmoke Error in the Auth Provider: " + JSON.stringify(err));

  }
  
  private updateSessionStateCallback = (req) => {
    console.log("updateSessionStateCallback: " + JSON.stringify(req) );

    this.verifyAuthorization();
    console.log("verify Call made");

  }

  private persistSession(sessionString) {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("session", "Smith");
    }
  }
}
