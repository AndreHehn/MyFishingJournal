export class Fish {

    fish: string = '';
    length: string = '';
    weight: string = '';
    place: string = '';
    method: string = '';
    weather: string = '';
    temperature: string = '';
    time: number;
    date: number;


    constructor(obj?: any) {
        this.fish = obj ? obj.fish : '';
        this.length = obj ? obj.length : '';
        this.weight = obj ? obj.weight : '';
        this.method = obj ? obj.street : '';
        this.place = obj ? obj.place : '';
        this.weather = obj ? obj.weather : '';
        this.temperature = obj ? obj.temperature : '';
        this.time = obj ? obj.time : '';
        this.date = obj ? obj.date : '';
    }
    public toJson() {
        return {
            fish: this.fish,
            length: this.length,
            weight: this.weight,
            method: this.method,
            place: this.place,
            weather: this.weather,
            temperature: this.temperature,
            time: this.time,
            date: this.date
        }
    }
}