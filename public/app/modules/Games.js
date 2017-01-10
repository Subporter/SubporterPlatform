"use strict";
var Game = (function () {
    function Game(_id, away, banner, competiton, date, home, importance, loans) {
        this._id = _id;
        this.away = away;
        this.banner = banner;
        this.competiton = competiton;
        this.date = date;
        this.home = home;
        this.importance = importance;
        this.loans = loans;
    }
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Games.js.map