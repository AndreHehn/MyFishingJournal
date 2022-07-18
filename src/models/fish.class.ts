export class Fish {

    fish: string = '';
    length: number;
    weight: number;
    place: string = '';
    method: string = '';
    comment: string = '';
    weather: string = '';
    temperature: string = '';
    date: number;
    time: string ='';



    constructor(obj?: any) {
        this.fish = obj ? obj.fish : '';
        this.length = obj ? obj.length : '';
        this.weight = obj ? obj.weight : '';
        this.method = obj ? obj.method : '';
        this.comment = obj ? obj.comment : '';
        this.place = obj ? obj.place : '';
        this.weather = obj ? obj.weather : '';
        this.temperature = obj ? obj.temperature : '';
        this.date = obj ? obj.date : '';
        this.time = obj ? obj.time : '';
    }
    public toJson() {
        return {
            fish: this.fish.toLowerCase(),
            length: this.length,
            weight: this.weight,
            method: this.method,
            comment: this.comment,
            place: this.place.toLowerCase(),
            weather: this.weather,
            temperature: this.temperature,
            date: this.date,
            time: this.time
        }
    }
}