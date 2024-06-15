import {FunctionBallInterface, type NumberBallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";

/**
 * カリー化された三項演算子?:のボール
 */
export class TernaryConditionalBall extends FunctionBallInterface<TernaryConditionalBall|null, ConditionalWithThenBall> {
    private funcVal: (x: NumberBallInterface) => {self: TernaryConditionalBall|null, other: ConditionalWithThenBall};
    
    constructor(removeSelf: boolean = false) {
        super();
        this.funcVal = (thenValue) => {
            return {self: removeSelf ? null : this, other: new ConditionalWithThenBall(thenValue.value(), removeSelf)}
        }
    }

    override func(x: NumberBallInterface): { self: TernaryConditionalBall|null; other: ConditionalWithThenBall } {
        return this.funcVal(x);
    }

    label(): string {
        return "?:";
    }
}

/**
 * TernaryConditionalに条件式が真の場合の出力を部分適用したボール
 */
export class ConditionalWithThenBall extends FunctionBallInterface<ConditionalWithThenBall|null, ConditionalWithBothBall> {
    private thenValue: number;
    private funcVal: (x: NumberBallInterface) => {self: ConditionalWithThenBall|null, other: ConditionalWithBothBall};

    constructor(thenValue: number, removeSelf: boolean = false) {
        super();
        this.funcVal = (elseValue) => {
            return {self: removeSelf ? null : this, other: new ConditionalWithBothBall(thenValue, elseValue.value(), removeSelf)}
        }
        this.thenValue = thenValue;
    }

    override func(x: NumberBallInterface): { self: ConditionalWithThenBall|null; other: ConditionalWithBothBall } {
        return this.funcVal(x);
    }

    label(): string {
        return `?${this.thenValue}:`;
    }
}

/**
 * ConditionalWithThenBallに条件式が真の場合と偽の場合の出力を部分適用したボール
 */
export class ConditionalWithBothBall extends FunctionBallInterface<ConditionalWithBothBall|null, NumberBallInterface> {
    private thenValue: number;
    private elseValue: number;
    private funcVal: (x: NumberBallInterface) => {self: ConditionalWithBothBall|null, other: NumberBallInterface}

    constructor(thenValue: number, elseValue: number, removeSelf: boolean = false) {
        super();
        this.funcVal = (condition) => {
            if (condition.value() === 0) {
                return {self: removeSelf ? null : this, other: new NumberBall(elseValue)};
            }
            else {
                return {self: removeSelf ? null : this, other: new NumberBall(thenValue)};
            
            }
        }
        this.thenValue = thenValue;
        this.elseValue = elseValue;
    }

    override func(x: NumberBallInterface): { self: ConditionalWithBothBall|null; other: NumberBallInterface } {
        return this.funcVal(x);
    }

    label(): string {
        return `?${this.thenValue}:${this.elseValue}`;
    }
}