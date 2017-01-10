import { Game } from './Games';
import { Team } from './Teams';
import { User } from './Users';

export class Subscription {
    constructor(public _id: Number, public place: String, public subscription: String, public team: Team, public user: User) { }
}