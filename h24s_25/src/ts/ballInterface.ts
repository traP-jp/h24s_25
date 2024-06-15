import { BallTypeEnum } from './balltypes'; 
// ball interface
export interface BallInterface {
    label: () => string;
    initialVelocity: { x: number, y: number };
    initialPosition: { x: number, y: number };
    ballType: () => BallTypeEnum;
}

// interface for each balltype
export interface NumberBallInterface extends BallInterface {
    value: () => number;
}

export interface FunctionBallInterface<T> extends BallInterface {
    func: () => (x: number) => T;
}

export interface HigherOrderFunctionBallInterface<T1, T2> extends BallInterface {
    func: () => (f: (x: number) => T1) => T2;
}

export interface InputBallInterface extends BallInterface {
    argId: () => number;
    setValue: (value: number) => void;
    convertToNumberBall: () => NumberBallInterface;
}

export interface OutputBallInterface extends BallInterface {
    outputStreamId: () => number;
    outputValue: () => number;
}