"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Headers_1 = require("../common/Headers");
var UploadService_1 = require("./UploadService");
var UploadItem_1 = require("./UploadItem");
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.baseUrl = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/";
    }
    ApiService.prototype.get = function (url) {
        url = this.baseUrl + url;
        if (localStorage.getItem('id_token')) {
            Headers_1.contentHeaders.set('Authorization', localStorage.getItem('id_token'));
        }
        return this.http.get(url, {
            headers: Headers_1.contentHeaders
        });
    };
    ApiService.prototype.post = function (url, body) {
        url = this.baseUrl + url;
        if (localStorage.getItem('id_token')) {
            Headers_1.contentHeaders.set('Authorization', localStorage.getItem('id_token'));
        }
        return this.http.post(url, body, {
            headers: Headers_1.contentHeaders
        });
    };
    ApiService.prototype.postWithFiles = function (url, body, cb) {
        url = this.baseUrl + url;
        var uploadService = new UploadService_1.UploadService({ url: url, token: localStorage.getItem('id_token') });
        var uploadItem = new UploadItem_1.UploadItem(uploadService, 'POST');
        uploadItem.formData = new FormData();
        for (var key in body) {
            uploadItem.formData.append(key, body[key]);
        }
        uploadItem.callback = cb;
        uploadItem.upload();
    };
    ApiService.prototype.put = function (url, body) {
        url = this.baseUrl + url;
        if (localStorage.getItem('id_token')) {
            Headers_1.contentHeaders.set('Authorization', localStorage.getItem('id_token'));
        }
        return this.http.put(url, body, {
            headers: Headers_1.contentHeaders
        });
    };
    ApiService.prototype.putWithFiles = function (url, body, cb) {
        url = this.baseUrl + url;
        var uploadService = new UploadService_1.UploadService({ url: url, token: localStorage.getItem('id_token') });
        var uploadItem = new UploadItem_1.UploadItem(uploadService, 'PUT');
        uploadItem.formData = new FormData();
        for (var key in body) {
            uploadItem.formData.append(key, body[key]);
        }
        uploadItem.callback = cb;
        uploadItem.upload();
    };
    ApiService.prototype.delete = function (url) {
        url = this.baseUrl + url;
        if (localStorage.getItem('id_token')) {
            Headers_1.contentHeaders.set('Authorization', localStorage.getItem('id_token'));
        }
        return this.http.delete(url, {
            headers: Headers_1.contentHeaders
        });
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=ApiService.js.map