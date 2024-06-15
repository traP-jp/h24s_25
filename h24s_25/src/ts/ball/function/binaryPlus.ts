import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryPlusBall extends FunctionBall<BinaryPlusBall|null, PlusBall> {
    constructor(removeSelf: boolean = false) {
        super(
            (x) => {
                return {self: removeSelf ? null : this, other:new PlusBall(x.value(), removeSelf)}
            }
            , "+", []
        )
    }
}

class PlusBall extends FunctionBallInterface<PlusBall|null, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: PlusBall|null, other: NumberBallInterface}

    constructor(x: number, removeSelf: boolean = false) {
        super();
        this.funcVal = (y) => {
            return {self: removeSelf ? null : this, other: new NumberBall(x+y.value())}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: PlusBall|null; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + "+";
    }
}