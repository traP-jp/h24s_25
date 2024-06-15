import { FunctionBall } from '@/ts/ballfunction'

export class UnaryMinusBall extends FunctionBall<number> {
    constructor(position: {x: number, y: number}, velocity: {x: number, y: number}) {
        super(
            function (x) {
                return -x;
            },
            "-", []
        )
        this.initialPosition = position
        this.initialVelocity = velocity
    }
}