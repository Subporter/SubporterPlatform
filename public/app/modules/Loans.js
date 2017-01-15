"use strict";
var Loan = (function () {
    function Loan(_id, game, lent, lent_by, lent_on, lent_out_by, paid, placed_on, subscription) {
        this._id = _id;
        this.game = game;
        this.lent = lent;
        this.lent_by = lent_by;
        this.lent_on = lent_on;
        this.lent_out_by = lent_out_by;
        this.paid = paid;
        this.placed_on = placed_on;
        this.subscription = subscription;
    }
    return Loan;
}());
exports.Loan = Loan;
//# sourceMappingURL=Loans.js.map