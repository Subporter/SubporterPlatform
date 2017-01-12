import { Game } from './Games';
import { Subscription } from './Subscriptions';
import { User } from './Users';

export class Loan {
    constructor(public _id: Number, public game: Game, public lent: Boolean, public lent_by: User, public lent_on: Date, public lent_out_by: User, public paid: Boolean, public placed_on: Date, public subscription: Subscription) { }
}