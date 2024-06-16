import { HigherOrderFunctionBall } from "@/ts/higherorderfunctionball";
import { BallInterface } from "@/ts/ballInterface";
import { FunctionBallInterface } from "@/ts/ballInterface";

export class SpawnFunctionBall<
    S extends BallInterface|null,
    O extends BallInterface|null,
> extends HigherOrderFunctionBall<
    S,
    O,
    FunctionBallInterface<S, O>,
    FunctionBallInterface<S, O>
> {
    constructor() {
        super(
            function (f: FunctionBallInterface<S, O>) {
                return {
                    self: f,
                    other: f
                }
            }, "D", []
        )
    }
}
