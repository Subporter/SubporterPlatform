"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var ApiService_1 = require("../../services/ApiService");
require("materialize-css");
require("angular2-materialize");
var common_1 = require("@angular/common");
var core_2 = require("angular2-cookie/core");
var Cart = (function () {
    function Cart(router, http, authHttp, apiService, activatedRoute, _location, _cookieService) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.apiService = apiService;
        this.activatedRoute = activatedRoute;
        this._location = _location;
        this._cookieService = _cookieService;
        this.modalActions = new core_1.EventEmitter();
        this.modalActions2 = new core_1.EventEmitter();
        this.modalActions3 = new core_1.EventEmitter();
        this.params = [];
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.prices = 0;
        this.price = 0;
        this.loans = [];
        this.counter = 0;
        this.show = true;
        this.loggedIn = false;
        this.isAdmin = false;
        this.loggedIn = !!localStorage.getItem('id_token');
    }
    Cart.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.loggedIn) {
            this.router.navigateByUrl('/');
        }
        this.apiService.get('check/admin').subscribe(function (response) {
            var result = JSON.parse(response.text()).success;
            _this.isAdmin = result;
        }, function (error) {
            _this.isAdmin = false;
        });
        var x = this._cookieService.getAll();
        this.cookie = x;
        if (this.isEmpty(x)) {
            this.show = false;
            this.showEmpty();
        }
        else {
            this.showCart();
        }
        console.log(x);
    };
    Cart.prototype.logout = function () {
        localStorage.removeItem('id_token');
        this.router.navigate(['/landing']);
    };
    Cart.prototype.showCart = function () {
        var cookie = this.cookie;
        for (var cook in cookie) {
            this._callApi("Anonymous", "api/loans/" + cook);
        }
    };
    Cart.prototype.showEmpty = function () {
    };
    Cart.prototype.useJwtHelper = function () {
        var token = localStorage.getItem("id_token");
        console.log("Token:", token);
        console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
    };
    Cart.prototype._callApi = function (type, url) {
        var _this = this;
        this.apiService.get(url).subscribe(function (response) { return _this.getLoan(response.text()); }, function (error) { return _this.response = error.text; });
    };
    Cart.prototype.getLoan = function (data) {
        var Data = data;
        var jsonData = JSON.parse(Data);
        this.loan = jsonData.data;
        this.loans[this.counter] = this.loan;
        this.price += (this.loan.game.home.price * 0.1);
        this.prices += (this.loan.game.home.price);
        console.log(this.loan);
        console.log(this.loans);
        this.counter++;
    };
    Cart.prototype.back = function () {
        this._location.back();
    };
    Cart.prototype.removeCookie = function (cookie) {
        this._cookieService.remove(cookie);
        location.reload();
    };
    Cart.prototype.isEmpty = function (obj) {
        if (obj == null)
            return true;
        if (obj.length > 0)
            return false;
        if (obj.length === 0)
            return true;
        if (typeof obj !== "object")
            return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key))
                return false;
        }
        return true;
    };
    Cart.prototype.pay = function () {
        var _this = this;
        var _loop_1 = function (loan) {
            this_1._cookieService.remove(loan._id);
            this_1.apiService.put("api/loans/lend/" + loan._id, null).subscribe(function (response) { return _this.paySuccess(response, loan); }, function (error) { return _this.response = error.text; });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.loans; _i < _a.length; _i++) {
            var loan = _a[_i];
            _loop_1(loan);
        }
        this.modalActions2.emit({ action: "modal", params: ['open'] });
    };
    Cart.prototype.paySuccess = function (response, loan) {
        console.log(response.text());
    };
    Cart.prototype.openModal = function () {
        this.modalActions.emit({ action: "modal", params: ['open'] });
    };
    Cart.prototype.closeModal = function () {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    };
    return Cart;
}());
Cart = __decorate([
    core_1.Component({
        selector: 'cart',
        templateUrl: './app/components/cart/cart.view.html',
        styleUrls: ['../../css/cart.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http, angular2_jwt_1.AuthHttp, ApiService_1.ApiService, router_1.ActivatedRoute, common_1.Location, core_2.CookieService])
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=Cart.js.map