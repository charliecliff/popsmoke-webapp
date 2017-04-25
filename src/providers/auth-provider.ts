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
    this.http.post(resetPassCodeURL, {headers: headers, withCredentials: true})
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
             .subscribe(
                function(response) { console.log("Success Response" + JSON.stringify(response) )},
                function(error) { console.log("Error happened" + error)},
                function() { console.log("the subscription is completed")});
  }

  logout() {
    console.log("logout");
    let logoutURL = this.baseAuthUrl + "logout";
    let headers = new Headers({"Content-Type": "application/json"});
    this.http.get(logoutURL, {headers: headers, withCredentials: true})
             .map((res:Response) => res.json())
             .subscribe(this.handleLogoutCallback,
                        this.handleErrorCallback);
  }

  // Logout Function which is intended to Burn the current Session
  verifyAuthorization() {
    console.log("verifyAuthorization");
    let url = this.baseAuthUrl + "is-logged-in";
    let headers = new Headers({"Content-Type": "application/json"});
    this.http.get(url, {headers: headers, withCredentials: true})
             .map((res:Response) => res.json())
             .subscribe(this.handleVerifyAuthorizationCallback,
                        this.handleErrorCallback);
  }



    private updateSessionStateCallback = (req) => {
    console.log("updateSessionStateCallback: " + JSON.stringify(req) );

    this.verifyAuthorization();
    console.log("verify Call made");

  }


  

  private handleErrorCallback = (err) => {
    console.log("PopSmoke Error in the Auth Provider: " + JSON.stringify(err));

  }

  private handleVerifyLoginback = (req) => {
    console.log("user is Logged In: " + JSON.stringify(req));

  }

  private handleLoginCallback = (req) => {
    console.log("handleLoginCallback: " + JSON.stringify(req));

    this.verifyAuthorization();
    console.log("verify Call made");
  }

  private handleLogoutCallback = (req) => {
    console.log("handleLogoutCallback: " + JSON.stringify(req));

    this.verifyAuthorization();
    console.log("verify Call made");
  }

  private handleVerifyAuthorizationCallback = (req) => {
    console.log("user is Logged In: " + JSON.stringify(req));

  }

  private persistSession(sessionString) {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("session", "Smith");
    }
  }
}
