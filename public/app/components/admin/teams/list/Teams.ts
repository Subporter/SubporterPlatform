import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Materialize } from 'materialize-css';
import { MaterializeAction } from 'angular2-materialize';

import { Competition } from '../../../../modules/Competitions';
import { Team } from '../../../../modules/Teams';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'admin-teams',
    templateUrl: './app/components/admin/teams/list/teams.view.html'
})

export class AdminTeams {
    competition: Number;
    competitions: Array<Competition> = [];
    teamsList: Array<Team> = [];
    teams: Array<Team> = [];
    selectedTeam: Team;
    modalActions = new EventEmitter<string | MaterializeAction>();
    sub: any;

    constructor(public route: ActivatedRoute, public apiService: ApiService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.competition = params["competition"];
            this.loadValues();
        });
    }

    loadValues() {
        this.apiService.get("api/teams").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length !== 0) {
                        data.forEach((i: any) => {
                            let team: Team = new Team(i._id, i.background, i.competition, i.logo, i.name, i.price, i.stadion);
                            this.teamsList.push(team);
                        });
                        this.filterValues();
                    }
                } else {
                    Materialize.toast("Unable to load teams at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to load teams at this time", 2000);
            }
        );

        this.apiService.get("api/competitions").subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    let data = result.data;
                    if (data.length != 0) {
                        let competitions: Array<Competition> = [];
                        data.forEach((i: any) => {
                            let competition: Competition = new Competition(i._id, i.country, i.description, i.logo, i.name, i.sport);
                            competitions.push(competition);
                        });
                        setTimeout(() => {
                            this.competitions = competitions;
                        }, 100);
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

    filterValues() {
        if (this.competition) {
            this.teams = this.teamsList.filter(x => x.competition._id === this.competition);
        } else {
            this.teams = this.teamsList;
        }
    }

    delete(id: Number) {
        this.selectedTeam = this.teams.filter(x => x._id === id)[0];
        this.modalActions.emit({ action: "modal", params: ['open'] })
    }

    confirmDelete(id: Number) {
        this.apiService.delete(`api/teams/${id}`).subscribe(
            response => {
                let result = JSON.parse(response.text());
                Materialize.toast(result.info, 2000);
                if (result.success) {
                    this.teams = this.teams.filter(x => x._id !== id);
                }
            },
            error => {
                Materialize.toast("Unable to delete team at this time", 2000);
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