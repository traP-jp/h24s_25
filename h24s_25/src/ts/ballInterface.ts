import { BallTypeEnum } from './balltypes'; 
// ball interface
export interface BallInterface {
    label: () => string;
    velocity: () => { x: number, y: number };
    position: () => { x: number, y: number };
    ballType: () => BallTypeEnum;
    id: () => number;
}

// interface for each balltype
export interface NumberBallInterface extends BallInterface {
    constructor: (value: number) => void;
    value: () => number;
    ballType: () => BallTypeEnum.NUMBER;
}

export interface FunctionBallInterface<T> extends BallInterface {
    constructor: (func: (x: number) => T) => void;
    func: () => (x: number) => T;
    ballType: () => BallTypeEnum.FUNCTION;
}

export interface HigherOrderFunctionBallInterface<T1, T2> extends BallInterface {
    constructor: (func: (f: (x: number) => T1) => T2) => void;
    func: () => (f: (x: number) => T1) => T2;
    ballType: () => BallTypeEnum.HIGHER_ORDER_FUNCTION;
}

export interface InputBallInterface extends BallInterface {
    constructor: (argId: number) => void;
    argId: () => number;
    setValue: (value: number) => void;
    convertToNumberBall: () => NumberBallInterface;
    ballType: () => BallTypeEnum.INPUT;
}

export interface OutputBallInterface extends BallInterface {
    constructor: (outputStreamId: number) => void;
    outputStreamId: () => number;
    outputValue: () => number;
    ballType: () => BallTypeEnum.OUTPUT;
}