"use strict";
var UploadItem = (function () {
    function UploadItem(uploadService, method) {
        this.uploadService = uploadService;
        this.method = method;
        this.alias = "file";
        this.callback = null;
        this.formData = null;
        this.headers = [];
        this.index = null;
        this.isCancel = false;
        this.isError = false;
        this.isReady = false;
        this.isSuccess = false;
        this.isUploaded = false;
        this.isUploading = false;
        this.progress = 0;
        this.url = "/";
        this.withCredentials = true;
    }
    UploadItem.prototype.upload = function () {
        try {
            this.uploadService.uploadItem(this);
        }
        catch (e) {
        }
    };
    UploadItem.prototype.init = function () {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.formData = null;
        this.callback = null;
    };
    UploadItem.prototype.onBeforeUpload = function () { };
    UploadItem.prototype.onProgress = function (progress) { };
    UploadItem.prototype.onSuccess = function (response, status, headers) { };
    UploadItem.prototype.onError = function (response, status, headers) { };
    UploadItem.prototype.onCancel = function (response, status, headers) { };
    UploadItem.prototype.onComplete = function (response, status, headers) {
        this.callback(response);
        this.init();
    };
    UploadItem.prototype._onBeforeUpload = function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    };
    UploadItem.prototype._onProgress = function (progress) {
        this.progress = progress;
        this.onProgress(progress);
    };
    UploadItem.prototype._onSuccess = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = null;
        this.onSuccess(response, status, headers);
    };
    UploadItem.prototype._onError = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = null;
        this.onError(response, status, headers);
        this.callback(response);
    };
    UploadItem.prototype._onCancel = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = null;
        this.onCancel(response, status, headers);
    };
    UploadItem.prototype._onComplete = function (response, status, headers) {
        this.onComplete(response, status, headers);
    };
    UploadItem.prototype._prepareToUploading = function () {
        this.isReady = true;
    };
    return UploadItem;
}());
exports.UploadItem = UploadItem;
//# sourceMappingURL=UploadItem.js.map