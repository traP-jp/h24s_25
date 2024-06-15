import { FunctionBall } from '@/ts/ballfunction'

export class BinaryNotEqualBall extends FunctionBall<(x: number) => number> {
    constructor(position: { x: number, y: number }, velocity: { x: number, y: number }) {
        super(
            function (x: number) {
                return function (y: number) {
                    if (x !== y){
                        return 1;
                    }
                    else{
                        return 0;
                    }
                }
            }
            , "!=", []
        )
        this.initialPosition = position;
        this.initialVelocity = velocity;
    }
}