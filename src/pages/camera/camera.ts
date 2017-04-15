import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as Providers from '../../providers';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  @ViewChild('cameraInput') cameraInput;
  @ViewChild('cameraPreview') cameraPreview;

  public title: string;
  public imageUrl: any;
  public imageFile: File;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private attachmentProvider: Providers.ImageAttachmentProvider) { }

  private clickCameraButton() {
    this.cameraInput.nativeElement.click();
  }

  private loadImageUrl(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (newEvent) => {
        // TYPESCRIPT BUG: Typescript does doest not recognize the "result" 
        // property of the Progress Event Type, although it is proper JS.
        // Until TypeScript fixes this issues, we will use the following
        // syntax to pull this property from our result object, although 
        // generally considered bad practice to rely on a priori knowdlege of 
        // object structure,
         this.imageUrl = newEvent.target["result"];
         console.log("imageURL");
         console.log(this.imageUrl);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private uploadImage(event) {
    console.log("uploadImage");
    this.attachmentProvider.uploadImageFile(this.imageFile);
  }
}
