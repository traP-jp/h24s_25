import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryLessThanOrEqualBall extends FunctionBall<BinaryLessThanOrEqualBall|null, LessThanOrEqualBall> {
    constructor(removeSelf: boolean = false) {
        super(
            (x) => {
                return {self: removeSelf ? null : this, other:new LessThanOrEqualBall(x.value(),removeSelf)}
            }
            , "<=", []
        )
    }
}

class LessThanOrEqualBall extends FunctionBallInterface<LessThanOrEqualBall|null, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: LessThanOrEqualBall|null, other: NumberBallInterface}

    constructor(x: number, removeSelf: boolean) {
        super();
        this.funcVal = (y) => {
            return {self: removeSelf ? null : this, other: new NumberBall(x<=y.value() ? 1 : 0)}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: LessThanOrEqualBall|null; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + "<=";
    }
}