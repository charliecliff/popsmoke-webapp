var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
var Da31Service = (function () {
    function Da31Service(http) {
        this.http = http;
        this.da31Url = "https://sleepy-scrubland-83197.herokuapp.com/api/da31";
    }
    Da31Service.prototype.postDa31FormData = function (form) {
        var body = JSON.stringify(form);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http.post(this.da31Url, body, { headers: headers, responseType: ResponseContentType.Blob })
            .map(this.extractPDFDataFromResponse)
            .catch(this.handleError);
    };
    Da31Service.prototype.extractPDFDataFromResponse = function (res) {
        var pdfBlob = new Blob([res.blob()], { type: 'application/pdf' });
        return pdfBlob;
    };
    Da31Service.prototype.handleError = function (error) {
        return Observable.throw('Server error');
    };
    return Da31Service;
}());
Da31Service = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], Da31Service);
export { Da31Service };
//# sourceMappingURL=da31.service.js.map