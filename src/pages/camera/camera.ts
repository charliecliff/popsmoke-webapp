import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Camera page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  
  @ViewChild('cameraInput') cameraInput;
  @ViewChild('cameraPreview') cameraPreview;

  public title: string;
  public imageUrl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  loadImageUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (newEvent) => {
        // TYPESCRIPT BUG: Typescript does doest not recognize the "result" 
        // property of the Progress Event Type, although it is proper JS.
        // Until TypeScript fixes this issues, we will use the following
        // syntax to pull this property from our result object, although 
        // generally considered bad practice to rely on a priori knowdlege of 
        // object structure,
         this.imageUrl = newEvent.target["result"];
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  } 
}
