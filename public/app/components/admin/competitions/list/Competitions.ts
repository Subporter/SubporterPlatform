import { Component } from '@angular/core';
import { Materialize } from 'materialize-css';
import * as $ from 'jquery';

import { Competition } from '../../../../modules/Competitions';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'admin-competitions',
    templateUrl: './app/components/admin/competitions/list/competitions.view.html'
})

export class AdminCompetitions {
    competitions: Array<Competition> = [];
    selectedCompetition: Competition;

    constructor(public apiService: ApiService) {

    }

    ngOnInit() {
        $('.modal').modal();
        this.apiService.get("api/competitions").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length !== 0) {
                        data.forEach((i: any) => {
                            let competition: Competition = new Competition(i._id, i.country, i.description, i.logo, i.name, i.sport);
                            this.competitions.push(competition);
                        });
                        console.log(this.competitions);
                    }
                } else {
                    Materialize.toast("Unable to load competitions at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to load competitions at this time", 2000);
            }
        );
    }

    /*delete(id: Number) {
        this.selectedCompetition = this.competitions.filter(country => country._id === id)[0];
    }

    confirmDelete(id: Number) {
        this.apiService.delete(`api/competitions/${id}`).subscribe(
            response => {
                let result = JSON.parse(response.text());
                Materialize.toast(result.info, 2000);
                if (result.success) {
                    this.competitions = this.competitions.filter(competition => competition._id !== id);
                }
            },
            error => {
                Materialize.toast("Unable to delete competition at this time", 2000);
            }
        )
    }*/

}