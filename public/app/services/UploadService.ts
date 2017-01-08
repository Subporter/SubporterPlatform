import { UploadItem } from "./UploadItem";

export class UploadService {
    isHTML5: boolean = true;
    isUploading: boolean = false;
    progress: number = 0;
    timeout: number = 10000;
    token: string;
    url: string;

    constructor(options: any) {
        this.url = options.url;
        this.token = options.token;
    }

    uploadItem(item: UploadItem) {
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this._xhrTransport(item);
    }

    _onBeforeUploadItem(item: any) {
        item._onBeforeUpload();
    }

    _parseHeaders(headers: any) {
        let parsed: any = {}, key: any, val: any, i: any;

        if (!headers) {
            return parsed;
        }

        headers.split('\n').map((line: any) => {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();

            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });

        return parsed;
    }

    _transformResponse(response: any, headers: any): any {
        return response;
    }

    _isSuccessCode(status: any) {
        return (status >= 200 && status < 300) || status === 304;
    }

    _render() { }

    _xhrTransport(item: any) {
        let xhr = item._xhr = new XMLHttpRequest();
        xhr.timeout = this.timeout;

        this._onBeforeUploadItem(item);

        xhr.upload.onprogress = (event) => { };

        xhr.onload = () => {
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            let response = this._transformResponse(xhr.response, headers);
            let gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            let method = '_on' + gist + 'Item';
            (<any>this)[method](item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        };

        xhr.onerror = () => {
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            let response = this._transformResponse(xhr.response, headers);
            this._onErrorItem(item, response, xhr.status, headers);
        };

        xhr.ontimeout = () => {
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            let response = this._transformResponse(xhr.response, headers);
            this._onErrorItem(item, response, xhr.status, headers);
        };

        xhr.onabort = () => {
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            let response = this._transformResponse(xhr.response, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        };

        xhr.open(item.method, this.url, true);
        xhr.withCredentials = item.withCredentials;

        if (this.token) {
            xhr.setRequestHeader('Authorization', this.token);
        }

        xhr.send(item.formData);
        this._render();
    }

    onSuccessItem(item: any, response: any, status: any, headers: any) { }

    onErrorItem(item: any, response: any, status: any, headers: any) {
        this.isUploading = false;
    }

    onCancelItem(item: any, response: any, status: any, headers: any) { }

    onCompleteItem(item: any, response: any, status: any, headers: any) { }

    _onSuccessItem(item: any, response: any, status: any, headers: any) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    }

    _onErrorItem(item: any, response: any, status: any, headers: any) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    }

    _onCancelItem(item: any, response: any, status: any, headers: any) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    }

    _onCompleteItem(item: any, response: any, status: any, headers: any) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);

        this.isUploading = false;

        this._render();
    }
}