import{BallTypeEnum} from './balltypes';
import {BallInterface, HigherOrderFunctionBallInterface, NumberBallInterface, FunctionBallInterface} from './ballInterface';

export class HigherOrderFunctionBall<
    S1 extends BallInterface|null, 
    O1 extends BallInterface|null,
    S2 extends BallInterface|null, 
    O2 extends BallInterface|null,
> extends HigherOrderFunctionBallInterface<S1,O1,S2,O2>{
      symbol: string;
      applied: number[];
      private readonly funcVal: (f: FunctionBallInterface<S1, O1>) => {self: S2, other: O2};

      constructor(func: (f: FunctionBallInterface<S1, O1>) => {self: S2, other: O2}, symbol: string, applied: number[]) {
            super();
            this.funcVal = func;
            this.symbol = symbol;
            this.applied = applied;
      }
      override func(f: FunctionBallInterface<S1, O1>): { self: S2, other: O2 } {
            return this.funcVal(f);
      }
      ballType(): BallTypeEnum {
            return BallTypeEnum.HIGHER_ORDER_FUNCTION;
      }

      label(): string{
            let label: string = this.symbol;
            this.applied.forEach(
                  function (value) {
                        label += ` ${value.toString}`
                  }
            )
            return label;
      }
}