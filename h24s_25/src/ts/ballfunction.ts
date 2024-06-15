import{BallTypeEnum} from './balltypes';
import {FunctionBallInterface} from './ballInterface';
class BallFunction<T> implements FunctionBallInterface<T>{
      private x: number;
      symbol: string;
      applied: number[];
      initialVelocity: { x: number, y: number };
      initialPosition: { x: number, y: number };

      ['constructor']: (func: (x: number) => T, symbol: string, applied: number[]) => void;
      func: () => (x: number) => T;
      ballType: () => BallTypeEnum.FUNCTION;
      label: () => string;
}