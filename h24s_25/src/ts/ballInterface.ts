import { BallTypeEnum } from './balltypes';
// ball interface
/**
 * 玉を表す抽象クラス
 */
export abstract class BallInterface {
    /**
     * canvas上に表示される玉のラベルを返す
     */
    abstract label(): string;

    /**
     * BallTypeEnumを返す
     */
    abstract ballType(): number;
}

// interface for each balltype
/**
 * 数字の玉を表す抽象クラス
 */
export abstract class NumberBallInterface extends BallInterface {
    /**
     * 玉が持つ値
     */
    abstract value(): number;

    /**
     * BallTypeEnumを返す
     */
    override ballType() {return BallTypeEnum.NUMBER}
}

/**
 * 関数の玉を表す抽象クラス
 * @typeParam T 関数の返り値の型
 */
export abstract class FunctionBallInterface<S extends BallInterface|null, O extends BallInterface|null> extends BallInterface {
    /**
     * 関数
     */
    abstract func(x: NumberBallInterface): {self: S, other: O};

    /**
     * BallTypeEnumを返す
     */
    override ballType(): number {
        return BallTypeEnum.FUNCTION;
    }
}

/**
 * 高階関数の玉を表す抽象クラス
 * @typeParam T1 関数の引数の戻り値の型
 * @typeParam T2 関数の返り値の型
 */
export abstract class HigherOrderFunctionBallInterface<
    S1 extends BallInterface|null,
    O1 extends BallInterface|null,
    S2 extends BallInterface|null,
    O2 extends BallInterface|null,
> extends BallInterface {
    /**
     * 高階関数
     */
    abstract func(f: FunctionBallInterface<S1, O1>): {self: S2, other: O2};

    /**
     * BallTypeEnumを返す
     */
    override ballType() {
        return BallTypeEnum.HIGHER_ORDER_FUNCTION;
    }
}

/**
 * 出力の玉を表す抽象クラス
 */
export abstract class OutputBallInterface extends BallInterface {
    /**
     * 出力のindex
     */
    abstract outputIndex: number;


    /**
     * BallTypeEnumを返す
     */
    override ballType() {
        return BallTypeEnum.OUTPUT;
    }
}