"use strict";
var User = (function () {
    function User(_id, address, avatar, date_of_birth, email, favorites, firstname, joined_on, name, national_registry_number, phone, subscriptions, username) {
        this._id = _id;
        this.address = address;
        this.avatar = avatar;
        this.date_of_birth = date_of_birth;
        this.email = email;
        this.favorites = favorites;
        this.firstname = firstname;
        this.joined_on = joined_on;
        this.name = name;
        this.national_registry_number = national_registry_number;
        this.phone = phone;
        this.subscriptions = subscriptions;
        this.username = username;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=Users.js.map