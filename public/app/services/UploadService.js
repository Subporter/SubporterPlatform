"use strict";
var UploadService = (function () {
    function UploadService(options) {
        this.isHTML5 = true;
        this.isUploading = false;
        this.progress = 0;
        this.timeout = 10000;
        this.url = options.url;
        this.token = options.token;
    }
    UploadService.prototype.uploadItem = function (item) {
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this._xhrTransport(item);
    };
    UploadService.prototype._onBeforeUploadItem = function (item) {
        item._onBeforeUpload();
    };
    UploadService.prototype._parseHeaders = function (headers) {
        var parsed = {}, key, val, i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map(function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
            }
        });
        return parsed;
    };
    UploadService.prototype._transformResponse = function (response, headers) {
        return response;
    };
    UploadService.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    UploadService.prototype._render = function () { };
    UploadService.prototype._xhrTransport = function (item) {
        var _this = this;
        var xhr = item._xhr = new XMLHttpRequest();
        xhr.timeout = this.timeout;
        this._onBeforeUploadItem(item);
        xhr.upload.onprogress = function (event) { };
        xhr.onload = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            var method = '_on' + gist + 'Item';
            _this[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onerror = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
        };
        xhr.ontimeout = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
        };
        xhr.onabort = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.open(item.method, this.url, true);
        xhr.withCredentials = item.withCredentials;
        if (this.token) {
            xhr.setRequestHeader('Authorization', this.token);
        }
        xhr.send(item.formData);
        this._render();
    };
    UploadService.prototype.onSuccessItem = function (item, response, status, headers) { };
    UploadService.prototype.onErrorItem = function (item, response, status, headers) {
        this.isUploading = false;
    };
    UploadService.prototype.onCancelItem = function (item, response, status, headers) { };
    UploadService.prototype.onCompleteItem = function (item, response, status, headers) { };
    UploadService.prototype._onSuccessItem = function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    };
    UploadService.prototype._onErrorItem = function (item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    };
    UploadService.prototype._onCancelItem = function (item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    };
    UploadService.prototype._onCompleteItem = function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        this.isUploading = false;
        this._render();
    };
    return UploadService;
}());
exports.UploadService = UploadService;
//# sourceMappingURL=UploadService.js.map