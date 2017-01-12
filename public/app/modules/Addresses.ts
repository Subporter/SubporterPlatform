import { Country } from './Countries';

export class Address {
    constructor(public _id: Number, public city: String, public country: Country, public number: Number, public postal: Number, public street: String) { }
}