import { Address } from './Addresses';
import { Competition } from './Competitions';

export class Team {
    constructor(public _id: Number, public background: String, public competition: Competition, public logo: String, public name: String, public price: Number, public stadion: String) { }
}