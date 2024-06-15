import {NumberBallInterface} from './ballInterface';

export class NumberBall extends NumberBallInterface {
    numberValue: number;
   constructor (value : number){
        super();
        this.numberValue = value
   }
    value(): number {
        return this.numberValue;
    }
    label(): string {
        return this.value().toString()
    }
}   