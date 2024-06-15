import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryDivisionBall extends FunctionBall<BinaryDivisionBall, DivisionBall> {
    constructor() {
        super(
            (x) => {
                return {self: this, other:new DivisionBall(x.value())}
            }
            , "/", []
        )
    }
}

class DivisionBall extends FunctionBallInterface<DivisionBall, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: DivisionBall, other: NumberBallInterface}

    constructor(x: number) {
        super();
        this.funcVal = (y) => {
            return {self: this, other: new NumberBall(x/y.value())}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: DivisionBall; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + "/";
    }
}