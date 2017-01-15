import { Team } from './Teams';
import { Competition } from './Competitions';
import { Loan } from './Loans';

export class Game {
    constructor(public _id: Number, public away: Team, public banner: String, public competiton: Competition, public date: Date, public home: Team, public importance: Number, public loans: Array<Loan>) { }
}