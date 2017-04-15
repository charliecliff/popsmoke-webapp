import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageAttachmentProvider {

  constructor(public http: Http) { }

  uploadImageFile(file: File) {
      console.log("upload");
        this.makeFileRequest("http://localhost:3000/upload", [], file).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
  }

  makeFileRequest(url: string, params: Array<string>, file: File) {
        
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append("uploads[]", file, file.name);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
}
