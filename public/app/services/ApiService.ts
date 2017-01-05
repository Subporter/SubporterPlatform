import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/Headers'

@Injectable()
export class ApiService {
    baseUrl: String = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/";

    constructor(public http: Http) {

    }

    get(url) {
        url = this.baseUrl + url;
        if (localStorage.getItem("id_token")) {
            contentHeaders.set("Authorization", localStorage.getItem("id_token"));
        }
        return this.http.get(url, {
            headers: contentHeaders
        });
    }

	post(url, body) {
		url = this.baseUrl + url;
		if (localStorage.getItem("id_token")) {
            contentHeaders.set("Authorization", localStorage.getItem("id_token"));
		}
        return this.http.post(url, body, {
            headers: contentHeaders
        });
	}

	postWithFiles(url, body, files) {
		url = this.baseUrl + url;
		if (localStorage.getItem("id_token")) {
            contentHeaders.set("Authorization", localStorage.getItem("id_token"));
		}
	}

    put(url, body) {
        url = this.baseUrl + url;
		if (localStorage.getItem("id_token")) {
            contentHeaders.set("Authorization", localStorage.getItem("id_token"));
		}
        return this.http.put(url, body, {
            headers: contentHeaders
        });
    }

    putWithFiles(url, body, files) {
        url = this.baseUrl + url;
        if (localStorage.getItem("id_token")) {
            contentHeaders.set("Authorization", localStorage.getItem("id_token"));
        }
    }

    delete(url) {
        url = this.baseUrl + url;
		if (localStorage.getItem("id_token")) {
            contentHeaders.set("Authorization", localStorage.getItem("id_token"));
		}
        return this.http.delete(url, {
            headers: contentHeaders
        });
    }
}