import { Component, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/Headers'
import { ApiService } from '../../services/ApiService';
import 'materialize-css';
import 'angular2-materialize';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';

@Component({
    selector: 'profile',
    templateUrl: './app/components/profile/profile.view.html',
    styleUrls: ['../../css/profile.css']
})

export class Profile {
    modalActions = new EventEmitter<string | MaterializeAction>();
    modalActions2 = new EventEmitter<string | MaterializeAction>();
    modalActions3 = new EventEmitter<string | MaterializeAction>();
    modalActions4 = new EventEmitter<string | MaterializeAction>();
    modalActions5 = new EventEmitter<string | MaterializeAction>();
    modalActions6 = new EventEmitter<string | MaterializeAction>();
    response: String;
    api: String;
    games: JSON;
    form1: any;
    favorites: JSON;
    showFavorites = false;
    showNew = false;
    favoriteId: number;
    teams = [];
    user = [];
    today = new Date();
    selectOptions = [];
    avatar: File;
    name: String;
    firstname: String;
    email: String;
    phone: String;
    date_of_birth: String;
    street: String;
    number: String;
    city: String;
    postal: String;
    country: Number;
    password: String;
    password_old: String;
    password_two: String;
    plaats: String;
    team: String
    teamsRaw = [];
    abbo: File;

    private loggedIn = false;

    constructor(public router: Router, public http: Http, public apiService: ApiService) {
        this.loggedIn = !!localStorage.getItem('id_token');
    }

    save(event) {
        let birthdate = new Date(this.date_of_birth);

        let body = {
            name: this.name,
            firstname: this.firstname,
            street: this.street,
            number: this.number,
            city: this.city,
            postal: this.postal,
            country: this.country,
            email: this.email,
            avatar: this.avatar,
            date_of_birth: birthdate,
            phone: this.phone,
            national_registry_number: "96.05.05-342.01"
        };

        this.apiService.putWithFiles("api/users", body, (data) => {
            if (data) {
                this.showProfileModal();
            }
        });
    }

    changePass(event) {
        let body = {
            old_password: this.password_old,
            new_password: this.password
        };

        this.apiService.post("api/users/update/password", body).subscribe(
            response => this.showPasswordModal(),
            error => this.response = error.text
        );
    }

    updateAbbo(event) {
        let body = {
            place: this.plaats,
            subscription: this.abbo,
            team: this.team
        };

        this.apiService.postWithFiles("api/subscriptions", body, (data) => {
            if (data) {
                this.showAbboModel();
            }
        });
    }

    ngOnInit() {
        if (!this.loggedIn) {
            this.router.navigateByUrl('/');
        }

        this._callApi("Anonymous", "api/users");

        this.apiService.get("api/countries").subscribe(
            response => this.getCountries(response.text()),
            error => this.response = error.text
        );

        this.apiService.get("api/teams").subscribe(
            response => this.showTeams(response.text()),
            error => this.response = error.text
        );
    }

    showTeams(data) {
        let Data = data;
        let jsonData = JSON.parse(Data);
        this.teamsRaw = jsonData.data;
    }

    getCountries(data) {
        let Data = data;
        let jsonData = JSON.parse(Data);
        this.selectOptions = jsonData.data;
    }

    getUser(data) {
        let Data = data;
        let jsonData = JSON.parse(Data);
        this.user = jsonData.data;
        this.favorites = jsonData.data.favorites;

        if (!this.isEmpty(this.favorites)) {
            this.showFavorites = true;
        }

        this.getTeams();

        this.name = this.user.name;
        this.firstname = this.user.firstname;
        this.email = this.user.email;

        document.getElementById("namelbl").classList.add("active");
        document.getElementById("firstnamelbl").classList.add("active");
        document.getElementById("emaillbl").classList.add("active");


        if (("address" in this.user)) {
            this.street = this.user.address.street;
            this.number = this.user.address.number;
            this.city = this.user.address.city;
            this.postal = this.user.address.postal;
            this.country = this.user.address.country;

            document.getElementById("streetlbl").classList.add("active");
            document.getElementById("numberlbl").classList.add("active");
            document.getElementById("citylbl").classList.add("active");
            document.getElementById("postallbl").classList.add("active");
        }

        if ("phone" in this.user) {
            this.phone = this.user.phone;
            document.getElementById("phonelbl").classList.add("active");
        }

        if ("date_of_birth" in this.user) {
            let monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            let date = new Date(this.user.date_of_birth);
            let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
            this.date_of_birth = day + " " + monthNames[month] + ", " + year;
            document.getElementById("date_of_birthlbl").classList.add("active");
        }

        if ("avatar" in this.user) {
            this.avatar = this.user.avatar;
        }
    }

    removeFavorite(id) {
        this.modalActions.emit({ action: "modal", params: ['open'] });
        this.favoriteId = id;
    }

    removeFavoriteReal() {
        this.apiService.post("api/teams/favorite/" + this.favoriteId, null).subscribe(
            response => this.showSuccess(),
            error => this.response = error.text
        );
    }

    showSuccess() {
        this.modalActions2.emit({ action: "modal", params: ['open'] });
    }

    showProfileModal() {
        this.modalActions4.emit({ action: "modal", params: ['open'] });
    }

    showPasswordModal() {
        this.modalActions5.emit({ action: "modal", params: ['open'] });
    }

    showAbboModel() {
        this.modalActions6.emit({ action: "modal", params: ['open'] });
    }

    closeProfileModal() {
        this.modalActions4.emit({ action: "modal", params: ['close'] });
    }

    closePasswordModal() {
        this.modalActions5.emit({ action: "modal", params: ['close'] });
    }

    closeAbboModal() {
        this.modalActions6.emit({ action: "modal", params: ['close'] });
    }

    closeModal1() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    closeModal() {
        this.modalActions2.emit({ action: "modal", params: ['close'] });
        this.showFavoritesBack();
    }

    closeModal3() {
        this.modalActions3.emit({ action: "modal", params: ['close'] });
    }

    showAdd() {
        this.showFavorites = false;
        this.showNew = true;
    }

    showFavoritesBack() {
        this._callApi("Anonymous", "api/users");
        this.showFavorites = true;
        this.showNew = false;
    }

    _callApi(type, url) {
        this.apiService.get(url).subscribe(
            response => this.getUser(response.text()),
            error => this.response = error.text
        );
    }

    getTeams() {
        let counter = 0
        let teamsRaw = this.teamsRaw;

        for (let team of teamsRaw) {
            let success = true;
            for (let favorite of this.favorites) {
                if (team._id == favorite._id) {
                    success = false;
                }
            }
            if (success === true) {
                this.teams[counter] = team;
                counter++;
            }

        }
    }

    updateFavorite() {
        let select = document.getElementById('select');
        select = select.options[select.selectedIndex].value;

        let apiString = "api/teams/favorite/" + select;

        this.apiService.post(apiString, null).subscribe(
            response => this.showFavoritesBack(),
            error => console.log(error.text)
        );
    }

    isEmpty(obj) {
        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }

    selectAvatar(event) {
        let input = event.target;
        if (input && input.files[0]) {
            this.avatar = input.files[0];
        }
    }

    selectAbbo(event) {
        let input = event.target;
        if (input && input.files[0]) {
            this.abbo = input.files[0];
        }
    }
}