"use strict";
var Team = (function () {
    // teams_id: number;
    function Team(name, stadion, logo, price, address, sport, competition) {
        this.name = name;
        this.stadion = stadion;
        this.logo = logo;
        this.price = price;
        this.address = address;
        this.sport = sport;
        this.competition = competition;
    }
    return Team;
}());
exports.Team = Team;
//# sourceMappingURL=team.model.js.map