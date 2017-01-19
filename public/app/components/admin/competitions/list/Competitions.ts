import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Materialize } from 'materialize-css';
import { MaterializeAction } from 'angular2-materialize';

import { Sport } from '../../../../modules/Sports';
import { Country } from '../../../../modules/Countries';
import { Competition } from '../../../../modules/Competitions';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'admin-competitions',
    templateUrl: './app/components/admin/competitions/list/competitions.view.html'
})

export class AdminCompetitions {
    sport: Number;
    country: Number;
    sports: Array<Sport> = [];
    countries: Array<Country> = [];
    competitionsList: Array<Competition> = [];
    competitions: Array<Competition> = [];
    selectedCompetition: Competition;
    modalActions = new EventEmitter<string | MaterializeAction>();
    sub: any;

    constructor(public route: ActivatedRoute, public apiService: ApiService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.country = params["country"];
            this.sport = params["sport"];
            this.loadValues();
        });
    }

    loadValues() {
        this.apiService.get("api/competitions").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length !== 0) {
                        data.forEach((i: any) => {
                            let competition: Competition = new Competition(i._id, i.country, i.description, i.logo, i.name, i.sport);
                            this.competitionsList.push(competition);
                        });
                        this.filterValues();
                    }
                } else {
                    Materialize.toast("Unable to load competitions at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to load competitions at this time", 2000);
            }
        );

        this.apiService.get("api/sports").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length != 0) {
                        let sports: Array<Sport> = [];
                        data.forEach((i: any) => {
                            let sport: Sport = new Sport(i._id, i.name, i.featured);
                            sports.push(sport);
                        });
                        setTimeout(() => {
                            this.sports = sports;
                        }, 100);
                    }
                } else {
                    Materialize.toast("Unable to load sports at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to load sports at this time", 2000);
            }
        );

        this.apiService.get("api/countries").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length != 0) {
                        let countries: Array<Country> = [];
                        data.forEach((i: any) => {
                            let country: Country = new Country(i._id, i.name, i.featured);
                            countries.push(country);
                        });
                        setTimeout(() => {
                            this.countries = countries;
                        }, 100);
                    }
                } else {
                    Materialize.toast("Unable to load countries at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to load countries at this time", 2000);
            }
        );
    }

    filterValues() {
        if (this.sport && this.country) {
            this.competitions = this.competitionsList.filter(x => x.sport._id === this.sport && x.country._id === this.country);
        } else if (this.sport) {
            this.competitions = this.competitionsList.filter(x => x.sport._id === this.sport);
        } else if (this.country) {
            this.competitions = this.competitionsList.filter(x => x.country._id === this.country);
        } else {
            this.competitions = this.competitionsList;
        }
    }

    delete(id: Number) {
        this.selectedCompetition = this.competitions.filter(country => country._id === id)[0];
        this.modalActions.emit({ action: "modal", params: ['open'] })
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
        );
        this.modalActions.emit({ action: "modal", params: ['close'] })
    }

    closeModal() {
        this.modalActions.emit({ action: "modal", params: ['close'] })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}