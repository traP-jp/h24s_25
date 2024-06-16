import {BallInterface, FunctionBallInterface, NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";
import {BallTypeEnum} from "@/ts/balltypes";

export class DuplicateBall extends FunctionBallInterface<NumberBallInterface, NumberBallInterface> {
    func(x: NumberBallInterface): { self: NumberBallInterface; other: NumberBallInterface } {
        return {self: new NumberBall(x.value()), other: new NumberBall(x.value())};
    }

    label(): string {
        return "dup";
    }
}