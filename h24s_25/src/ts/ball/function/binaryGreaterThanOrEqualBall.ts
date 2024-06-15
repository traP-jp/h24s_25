import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryGreaterThanOrEqualBall extends FunctionBall<BinaryGreaterThanOrEqualBall|null, GreaterThanOrEqualBall> {
    constructor(removeSelf: boolean = false) {
        super(
            (x) => {
                return {self: removeSelf ? null : this, other:new GreaterThanOrEqualBall(x.value(),removeSelf)}
            }
            , ">=", []
        )
    }
}

class GreaterThanOrEqualBall extends FunctionBallInterface<GreaterThanOrEqualBall|null, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: GreaterThanOrEqualBall|null, other: NumberBallInterface}

    constructor(x: number, removeSelf: boolean) {
        super();
        this.funcVal = (y) => {
            return {self: removeSelf ? null : this, other: new NumberBall(x>=y.value() ? 1 : 0)}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: GreaterThanOrEqualBall|null; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + ">=";
    }
}