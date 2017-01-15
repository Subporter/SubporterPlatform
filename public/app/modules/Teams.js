"use strict";
var Team = (function () {
    function Team(_id, background, competition, logo, name, price, stadion) {
        this._id = _id;
        this.background = background;
        this.competition = competition;
        this.logo = logo;
        this.name = name;
        this.price = price;
        this.stadion = stadion;
    }
    return Team;
}());
exports.Team = Team;
//# sourceMappingURL=Teams.js.map