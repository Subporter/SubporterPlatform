import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { contentHeaders } from '../common/Headers'

import { UploadService } from './UploadService';
import { UploadItem } from './UploadItem';

@Injectable()
export class ApiService {
    baseUrl: String = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/";

    constructor(public http: Http) { }

    get(url) {
        url = this.baseUrl + url;
        if (localStorage.getItem('id_token')) {
            contentHeaders.set('Authorization', localStorage.getItem('id_token'));
        }
        return this.http.get(url, {
            headers: contentHeaders
        });
    }

    post(url, body) {
        url = this.baseUrl + url;
        if (localStorage.getItem('id_token')) {
            contentHeaders.set('Authorization', localStorage.getItem('id_token'));
        }
        
        return this.http.post(url, body, {
            headers: contentHeaders
        });
    }

    postWithFiles(url, body, cb) {
        url = this.baseUrl + url;
        let uploadService: UploadService = new UploadService({ url: url, token: localStorage.getItem('id_token') });
        let uploadItem: UploadItem = new UploadItem(uploadService, 'POST');

        uploadItem.formData = new FormData();
        for (let key in body) {
            uploadItem.formData.append(key, body[key]);
        }

        uploadItem.callback = cb;
        uploadItem.upload();
    }

    put(url, body) {
        url = this.baseUrl + url;
        if (localStorage.getItem('id_token')) {
            contentHeaders.set('Authorization', localStorage.getItem('id_token'));
        }
        return this.http.put(url, body, {
            headers: contentHeaders
        });
    }

    putWithFiles(url, body, cb) {
        url = this.baseUrl + url;
        let uploadService: UploadService = new UploadService({ url: url, token: localStorage.getItem('id_token') });
        let uploadItem: UploadItem = new UploadItem(uploadService, 'PUT');

        uploadItem.formData = new FormData();
        for (let key in body) {
            uploadItem.formData.append(key, body[key]);
        }

        uploadItem.callback = cb;
        uploadItem.upload();
    }

    delete(url) {
        url = this.baseUrl + url;
        if (localStorage.getItem('id_token')) {
            contentHeaders.set('Authorization', localStorage.getItem('id_token'));
        }
        return this.http.delete(url, {
            headers: contentHeaders
        });
    }
}