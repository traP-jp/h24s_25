import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryMinusBall extends FunctionBall<BinaryMinusBall, MinusBall> {
    constructor() {
        super(
            (x) => {
                return {self: this, other:new MinusBall(x.value())}
            }
            , "-", []
        )
    }
}

class MinusBall extends FunctionBallInterface<MinusBall, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: MinusBall, other: NumberBallInterface}

    constructor(x: number) {
        super();
        this.funcVal = (y) => {
            return {self: this, other: new NumberBall(x-y.value())}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: MinusBall; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + "-";
    }
}