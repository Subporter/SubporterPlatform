import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Materialize } from 'materialize-css';

import { ApiService } from '../../../../services/ApiService';

@Component({
    selector: 'sports-edit',
    templateUrl: './app/components/admin/sports/edit/edit.view.html'
})

export class SportsEdit {
    id: Number;
	name: String = "";
    sub: any;

    constructor(public router: Router, public route: ActivatedRoute, public apiService: ApiService) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params["id"];
            this.apiService.get(`api/sports/${this.id}`).subscribe(
                response => {
                    let result = JSON.parse(response.text());
                    if (result.success) {
                        this.name = result.data.name;
                    } else {
                        this.router.navigate(['admin/sports']);
                    }
                },
                error => {
                    this.router.navigate(['admin/sports']);
                }
            )
        });
    }

    edit(event) {
        let name = this.name;

        let body = JSON.stringify({
            name
        });

        this.apiService.put(`api/sports/${this.id}`, body).subscribe(
            response => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    this.router.navigate(['admin/sports']);
                } else {
                    Materialize.toast("Unable to edit sport at this time", 2000);
                }
            },
            error => {
                Materialize.toast("Unable to edit sport at this time", 2000);
            }
        );
    }
}