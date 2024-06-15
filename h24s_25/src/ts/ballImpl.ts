import { BallTypeEnum } from './balltypes'; 
import type { HigherOrderFunctionBallInterface } from "./ballInterface";

export class HigherOrderFunctionBall<T1, T2> implements HigherOrderFunctionBallInterface<T1, T2> {
    symbol: string;
    applied: number[];
    initialVelocity: { x: number, y: number } = {x: 0, y: 0};
    initialPosition: { x: number, y: number } = {x: 0, y: 0};
    private funcVal: (f: (x: number) => T1) => T2;

    constructor(func: (f: (x: number) => T1) => T2, symbol: string, applied: number[]) {
        this.funcVal = func;
        this.symbol = symbol;
        this.applied = applied;
    }
    func(): (f: (x: number) => T1) => T2 {
        return  this.funcVal;
    }
    ballType(): BallTypeEnum {
            return BallTypeEnum.HIGHER_ORDER_FUNCTION
    }
    label(): string{
            let label: string = "";
            this.applied.forEach(
                function (value) {
                        label += `${value.toString} `
                }
            )
            label += this.symbol
            return label
    }
}