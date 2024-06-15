import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryLessThanBall extends FunctionBall<BinaryLessThanBall|null, LessThanBall> {
    constructor(removeSelf: boolean = false) {
        super(
            (x) => {
                return {self: removeSelf ? null : this, other:new LessThanBall(x.value(),removeSelf)}
            }
            , "<", []
        )
    }
}

class LessThanBall extends FunctionBallInterface<LessThanBall|null, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: LessThanBall|null, other: NumberBallInterface}

    constructor(x: number, removeSelf: boolean) {
        super();
        this.funcVal = (y) => {
            return {self: removeSelf ? null : this, other: new NumberBall(x<y.value() ? 1 : 0)}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: LessThanBall|null; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + "<";
    }
}