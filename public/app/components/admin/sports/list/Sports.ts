import { Component } from '@angular/core';
import { Materialize } from 'materialize-css';
import * as $ from 'jquery';

import { Sport } from '../../../../modules/Sports'

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'admin-sports',
    templateUrl: './app/components/admin/sports/list/sports.view.html'
})

export class AdminSports {
    sports: Array<Sport> = [];
    selectedSport: Sport = new Sport(0, "");

    constructor(public apiService: ApiService) {

    }

    ngOnInit() {
        $('.modal').modal();
        this.apiService.get("api/sports").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length !== 0) {
                        data.forEach((i: any) => {
                            let sport: Sport = new Sport(i._id, i.name);
                            this.sports.push(sport);
                        });
                    }
                } else {
                    Materialize.toast("Unable to load sports at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to load sports at this time", 2000);
            }
        );
    }

    delete(id: Number) {
        this.selectedSport = this.sports.filter(sport => sport._id === id)[0];
    }

    confirmDelete(id: Number) {
        this.apiService.delete(`api/sports/${id}`).subscribe(
            response => {
                let result = JSON.parse(response.text());
                Materialize.toast(result.info, 2000);
                if (result.success) {
                    this.sports = this.sports.filter(sport => sport._id !== id);
                }
            },
            error => {
                Materialize.toast("Unable to delete sport at this time", 2000);
            }
        )
    }

}