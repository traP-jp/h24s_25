import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryMinusBall extends FunctionBall<BinaryMinusBall|null, MinusBall> {
    constructor(removeSelf: boolean = false) {
        super(
            (x) => {
                return {self: removeSelf ? null : this, other:new MinusBall(x.value(),removeSelf)}
            }
            , "-", []
        )
    }
}

class MinusBall extends FunctionBallInterface<MinusBall|null, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: MinusBall|null, other: NumberBallInterface}

    constructor(x: number, removeSelf: boolean) {
        super();
        this.funcVal = (y) => {
            return {self: removeSelf ? null : this, other: new NumberBall(x-y.value())}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: MinusBall|null; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + "-";
    }
}