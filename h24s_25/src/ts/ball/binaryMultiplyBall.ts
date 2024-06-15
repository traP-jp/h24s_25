import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryMultiplyBall extends FunctionBall<BinaryMultiplyBall|null, MultiplyBall> {
    constructor(removeSelf: boolean = false) {
        super(
            (x) => {
                return {self: removeSelf ? null : this, other:new MultiplyBall(x.value())}
            }
            , "*", []
        )
    }
}

class MultiplyBall extends FunctionBallInterface<MultiplyBall|null, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: MultiplyBall|null, other: NumberBallInterface}

    constructor(x: number, removeSelf: boolean = false) {
        super();
        this.funcVal = (y) => {
            return {self: removeSelf ? null : this, other: new NumberBall(x*y.value())}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: MultiplyBall|null; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + "*";
    }
}