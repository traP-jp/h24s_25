import { BallTypeEnum } from './balltypes'; 
// ball interface
export abstract class BallInterface {
    abstract label(): string;
    abstract ballType(): BallTypeEnum;
}

// interface for each balltype
export abstract class NumberBallInterface extends BallInterface {
    abstract value(): number;
    override ballType() {return BallTypeEnum.NUMBER}
}

export abstract class FunctionBallInterface<T> extends BallInterface {
    abstract func(): (x: number) => T;
    override ballType(): BallTypeEnum {
        return BallTypeEnum.FUNCTION;
    }
}

export abstract class HigherOrderFunctionBallInterface<T1, T2> extends BallInterface {
    abstract func(): (f: (x: number) => T1) => T2;
    override ballType() {
        return BallTypeEnum.HIGHER_ORDER_FUNCTION;
    }
}

export abstract class OutputBallInterface extends BallInterface {
    abstract outputStreamId(): number;
    abstract outputValue(): number;
    override ballType() {
        return BallTypeEnum.OUTPUT;
    }
}