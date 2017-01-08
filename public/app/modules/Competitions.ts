import { Country } from './Countries';
import { Sport } from './Sports';

export class Competition {
    constructor(public _id: Number, public country: Country, public description: String, public logo: String, public name: String, public sport: Sport) { }
}