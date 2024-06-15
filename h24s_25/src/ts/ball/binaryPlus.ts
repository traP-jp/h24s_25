import { FunctionBall } from '@/ts/ballfunction'

export class BinaryPlusBall extends FunctionBall<(x: number) => number> {
    constructor(position: { x: number, y: number }, velocity: { x: number, y: number }) {
        super(
            function (x: number) {
                return function (y: number) {
                    return x + y;
                }
            }
            , "+", []
        )
        this.initialPosition = position;
        this.initialVelocity = velocity;
    }
}
