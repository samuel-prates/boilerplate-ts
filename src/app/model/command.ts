export class Command {
    get name(){
        return this.constructor.name;
    }
}