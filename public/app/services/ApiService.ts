import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers'

@Injectable()
export class ApiService {
	baseUrl: String = "http://localhost:1337/";

	constructor(public http: Http) {

	}

	call(url) {
		url = this.baseUrl + url;
		contentHeaders.append("Authorization", localStorage.getItem("id_token"));
		return this.http.get(url, {
			headers: contentHeaders
		});
	}	
}