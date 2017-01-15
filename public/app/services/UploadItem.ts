import { UploadService } from './UploadService';

export class UploadItem {
    alias: string = "file";
    callback: Function = null;
    formData: FormData = null;
    headers: any = [];
    index: number = null;
    isCancel: boolean = false;
    isError: boolean = false;
    isReady: boolean = false;
    isSuccess: boolean = false;
    isUploaded: boolean = false;
    isUploading: boolean = false;
    progress: number = 0;
    url: string = "/";
    withCredentials: boolean = true;

    constructor(public uploadService: UploadService, public method: string) { }

    upload() {
        try {
            this.uploadService.uploadItem(this);
        } catch (e) {

        }
    }

    init() {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.formData = null;
        this.callback = null;
    }

    onBeforeUpload() { }

    onProgress(progress: number) { }

    onSuccess(response: any, status: any, headers: any) { }

    onError(response: any, status: any, headers: any) { }

    onCancel(response: any, status: any, headers: any) { }

    onComplete(response: any, status: any, headers: any) {
        this.callback(response);
        this.init();
    }

    _onBeforeUpload() {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    }

    _onProgress(progress: number) {
        this.progress = progress;
        this.onProgress(progress);
    }

    _onSuccess(response: any, status: any, headers: any) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = null;
        this.onSuccess(response, status, headers);
    }

    _onError(response: any, status: any, headers: any) {
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
    }

    _onCancel(response: any, status: any, headers: any) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = null;
        this.onCancel(response, status, headers);
    }

    _onComplete(response: any, status: any, headers: any) {
        this.onComplete(response, status, headers);
    }

    _prepareToUploading() {
        this.isReady = true;
    }
}