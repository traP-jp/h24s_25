import { FunctionBall } from '@/ts/ballfunction'

export class BinaryGreaterThanOrEqualBall extends FunctionBall<(x: number) => number> {
    constructor(position: { x: number, y: number }, velocity: { x: number, y: number }) {
        super(
            function (x: number) {
                return function (y: number): number {
                    if (x>y || x===y){
                        return 1;
                    }
                    else{
                        return 0;
                    }
                }
            }
            , ">=", []
        )
        this.initialPosition = position;
        this.initialVelocity = velocity;
    }
}