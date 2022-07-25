export class User {

    name: string = '';
    uid : string = '';




    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.uid = obj ? obj.uid : '';

    }
    public toJson() {
        return {
            name: this.name,
            uid: this.uid,
        }
    }
}