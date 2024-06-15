import{BallTypeEnum} from './balltypes';
import type {FunctionBallInterface} from './ballInterface';
class BallFunction<T> implements FunctionBallInterface<T>{
      symbol: string;
      applied: number[];
      initialVelocity: { x: number, y: number } = {x: 0, y: 0};
      initialPosition: { x: number, y: number } = {x: 0, y: 0};
      private funcVal: (x: number) => T;

      constructor(func: (x: number) => T, symbol: string, applied: number[]) {
            this.funcVal = func;
            this.symbol = symbol;
            this.applied = applied;
      } 
      func(): (x: number) => T {
            return  this.funcVal;
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