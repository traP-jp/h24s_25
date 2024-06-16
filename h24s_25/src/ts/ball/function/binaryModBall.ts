import { FunctionBall } from '@/ts/ballfunction'
import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

export class BinaryModBall extends FunctionBall<BinaryModBall|null, ModBall> {
    constructor(removeSelf: boolean = false) {
        super(
            (x) => {
                return {self: removeSelf ? null : this, other:new ModBall(x.value(),removeSelf)}
            }
            , "%", []
        )
    }
}

class ModBall extends FunctionBallInterface<ModBall|null, NumberBallInterface> {
    private x: number;
    private funcVal: (x: NumberBallInterface) => {self: ModBall|null, other: NumberBallInterface}

    constructor(x: number, removeSelf: boolean) {
        super();
        this.funcVal = (y) => {
            return {self: removeSelf ? null : this, other: new NumberBall(x%y.value())}
        }
        this.x = x;
    }

    override func(x: NumberBallInterface): { self: ModBall|null; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return this.x.toString() + "%";
    }
}