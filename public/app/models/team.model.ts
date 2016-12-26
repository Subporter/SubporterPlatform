export class Team{
    name:string;
    stadion: string;
    logo: string;
    price: number;
    address: string;
    sport: string;
    competition: string;
    // teams_id: number;
    
    constructor(name: string, stadion:string, logo:string, price: number, address: string, sport:string, competition:string){
            this.name = name;
            this.stadion=stadion;
            this.logo=logo;
            this.price=price;
            this.address=address;
            this.sport=sport;
            this.competition=competition;
    }

}

