import{BallTypeEnum} from './balltypes';
import {BallInterface, FunctionBallInterface, NumberBallInterface} from './ballInterface';

export class FunctionBall<S extends BallInterface|null, O extends BallInterface|null> extends FunctionBallInterface<S,O>{
      symbol: string;
      applied: number[];
      private readonly funcVal: (x: NumberBallInterface) => { self: S, other: O };

      constructor(func: (x: NumberBallInterface) => {self: S, other: O}, symbol: string, applied: number[]) {
            super();
            this.funcVal = func;
            this.symbol = symbol;
            this.applied = applied;
      }
      override func(x: NumberBallInterface): { self: S, other: O } {
            return this.funcVal(x);
      }
      ballType(): BallTypeEnum {
            return BallTypeEnum.FUNCTION
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