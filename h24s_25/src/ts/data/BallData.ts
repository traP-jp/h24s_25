import {BallTypeEnum} from "@/ts/balltypes";
import {type BallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";
import {BinaryPlusBall} from "@/ts/ball/function/binaryPlus";
import {FunctionType} from "@/ts/ball/function/FunctionType";
import {BinaryMinusBall} from "@/ts/ball/function/binaryMinusBall";
import {BinaryMultiplyBall} from "@/ts/ball/function/binaryMultiplyBall";
import Screen from "@/ts/screen/Screen";

/**
 * 玉の情報のみを表すクラス
 */
export default class BallData {
    /**
     * 玉の種類
     */
    ballType: BallTypeEnum;
    /**
     * 初期位置
     */
    initialPosition: {x: number, y: number};
    /**
     * 初速度
     */
    initialVelocity: {x: number, y: number};
    /**
     * その他の情報
     */
    data: Map<string, string>;
    constructor(ballType: BallTypeEnum, initialPosition: {x: number, y: number}, initialVelocity: {x: number, y: number}, data: Map<string, string>) {
        this.ballType = ballType;
        this.initialPosition = initialPosition;
        this.initialVelocity = initialVelocity;
        this.data = data;
    }

    /**
     * {@link BallInterface}のインスタンスを生成
     */
    createBall(): BallInterface {
        switch (this.ballType) {
            case BallTypeEnum.OUTPUT:
                return new MockBallImpl();
            case BallTypeEnum.INPUT: {
                const input = this.data.has("input") ? Screen.getInstance().input[Number(this.data.get("input"))] : 0;
                return new NumberBall(input)
            }
            case BallTypeEnum.NUMBER: {
                return new NumberBall(this.data.has("value") ? Number(this.data.get("value")) : 0)
            }
            case BallTypeEnum.FUNCTION: {
                const functionType = this.data.has("functionType") ? Number(this.data.get("functionType")) : FunctionType.BINARY_PLUS;
                const removeSelf = this.data.has("removeSelf") ? Boolean(this.data.get("removeSelf")) : false
                switch (functionType) {
                    case FunctionType.BINARY_MINUS:
                        return new BinaryMinusBall(removeSelf);
                    case FunctionType.BINARY_PLUS:
                        return new BinaryPlusBall(removeSelf);
                    case FunctionType.BINARY_MULTIPLY:
                        return new BinaryMultiplyBall(removeSelf);
                    case FunctionType.BINARY_DIVISION:
                        return new BinaryMultiplyBall(removeSelf);
                    default:
                        return new MockBallImpl()
                }
            }
            case BallTypeEnum.HIGHER_ORDER_FUNCTION:
                return new MockBallImpl();
            default:
                return new MockBallImpl();
        }
    }

    /**
     * plain objectからデシリアライズ
     * @param obj object
     */
    static deserialize(obj: any) {
        return new BallData(obj.ballType, obj.initialPosition, obj.initialVelocity, obj.data);
    }

    /**
     * プレインオブジェクトに尻arise
     */
    serialize(): any {
        return JSON.parse(JSON.stringify(this));
    }
}

/**
 * 模擬玉
 */
class MockBallImpl implements BallInterface {
    constructor() {
    }

    ballType(): BallTypeEnum {
        return BallTypeEnum.NUMBER
    }

    label(): string {
        return "mock";
    }
}