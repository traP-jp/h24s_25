import { FunctionBall } from '@/ts/ballfunction'

export class UnaryFractionBall extends FunctionBall<number> {
    constructor(position: {x: number, y: number}, velocity: {x: number, y: number}) {
        super(
            function (x) {
                return 1/x;
            },
            "/", []
        )
        this.initialPosition = position
        this.initialVelocity = velocity
    }
}