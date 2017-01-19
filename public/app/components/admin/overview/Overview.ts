import { Component } from '@angular/core';
import { ApiService } from '../../../services/ApiService';

@Component({
    selector: 'admin-overview',
    templateUrl: './app/components/admin/overview/overview.view.html'
})

export class AdminOverview {
    constructor(public apiService: ApiService) { }
}