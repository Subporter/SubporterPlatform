import { Address } from './Addresses';
import { Team } from './Teams';
import { Subscription } from './Subscriptions';

export class User {
    constructor(public _id: Number, public address: Address, public avatar: String, public date_of_birth: Date, public email: String, public favorites: Array<Team>, public firstname: String, public joined_on: Date, public name: String, public national_registry_number: String, public phone: String, public subscriptions: Array<Subscription>, public username: String) { }
}