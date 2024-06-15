import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryDivisionBall extends FunctionBall<BinaryDivisionBall|null, DivisionBall> {
    constructor(removeSelf: boolean = false) {
        super(
            (x) => {
                return {self: removeSelf ? null : this, other:new DivisionBall(x.value(),removeSelf)}
            }
            , "/", []
        )
    }
}

class DivisionBall extends FunctionBallInterface<DivisionBall|null, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: DivisionBall|null, other: NumberBallInterface}

    constructor(x: number, removeSelf: boolean) {
        super();
        this.funcVal = (y) => {
            return {self: removeSelf ? null : this, other: new NumberBall(x/y.value())}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: DivisionBall|null; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + "/";
    }
}