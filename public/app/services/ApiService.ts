import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/Headers'

@Injectable()
export class ApiService {
    baseUrl: String = "http://localhost:1337/";

    constructor(public http: Http) {

    }

    get(url) {
        url = this.baseUrl + url;
        if (localStorage.getItem("id_token")) {
            contentHeaders.append("Authorization", localStorage.getItem("id_token"));
        }
        return this.http.get(url, {
            headers: contentHeaders
        });
    }
}