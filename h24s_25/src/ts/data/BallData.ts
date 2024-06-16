import {BallTypeEnum} from "@/ts/balltypes";
import {type BallInterface} from "@/ts/ballInterface";
import {NumberBall} from "@/ts/numberball";
import {BinaryPlusBall} from "@/ts/ball/function/binaryPlus";
import {FunctionType} from "@/ts/ball/function/FunctionType";
import {BinaryMinusBall} from "@/ts/ball/function/binaryMinusBall";
import {BinaryMultiplyBall} from "@/ts/ball/function/binaryMultiplyBall";
import {TernaryConditionalBall} from "@/ts/ball/function/ternaryConditional";
import Screen from "@/ts/screen/Screen";
import {OutputBallImpl} from "@/ts/ball/OutputBallImpl";
import {BinaryEqualBall} from "@/ts/ball/function/binaryEqualBall";
import {BinaryNotEqualBall} from "@/ts/ball/function/binaryNotEqualBall";
import {BinaryGreaterThanBall} from "@/ts/ball/function/binaryGreaterThanBall";
import {BinaryGreaterThanOrEqualBall} from "@/ts/ball/function/binaryGreaterThanOrEqualBall";
import {BinaryLessThanBall} from "@/ts/ball/function/binaryLessThanBall";
import {BinaryLessThanOrEqualBall} from "@/ts/ball/function/binaryLessThanOrequalBall";
import { SpawnFunctionBall } from "../ball/higherOrderFunction/spawnFunctionBall";
import {BinaryModBall} from "@/ts/ball/function/binaryModBall";
import {DeleteIfTrueBall} from "@/ts/ball/function/deleteIfTrueBall";
import {DeleteIfFalseBall} from "@/ts/ball/function/deleteIfFalseBall";
import {DuplicateBall} from "@/ts/ball/function/duplicateBall";

/**
 * 玉の情報のみを表すクラス
 */
export default class BallData {
    /**
     * 玉の種類
     */
    ballType: number;
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

    isStatic: boolean = false;

    constructor(ballType: number, initialPosition: {x: number, y: number}, initialVelocity: {x: number, y: number}, data: Map<string, string>, isStatic = false) {
        this.ballType = ballType;
        this.initialPosition = initialPosition;
        this.initialVelocity = initialVelocity;
        this.data = data;
        this.isStatic = isStatic;
    }

    /**
     * {@link BallInterface}のインスタンスを生成
     */
    createBall(): BallInterface {
        console.log(this)
        switch (this.ballType) {
            case BallTypeEnum.OUTPUT: {
                const outputIndex = this.data.has("index") ? Number(this.data.get("index")) : 0;
                return new OutputBallImpl(outputIndex);
            }
            case BallTypeEnum.INPUT: {
                const input = this.data.has("input") ? Screen.getInstance().input[Number(this.data.get("input"))] : 0;
                return new NumberBall(input);
            }
            case BallTypeEnum.NUMBER: {
                return new NumberBall(this.data.has("value") ? Number(this.data.get("value")) : 0)
            }
            case BallTypeEnum.FUNCTION: {
                const functionType = this.data.has("functionType") ? Number(this.data.get("functionType")) : FunctionType.BINARY_PLUS;
                const removeSelf = this.data.has("removeSelf") ? Boolean(this.data.get("removeSelf")) : false
                console.log(`functionType:${functionType}`)

                switch (functionType) {
                    case FunctionType.BINARY_MINUS:
                        return new BinaryMinusBall(removeSelf);
                    case FunctionType.BINARY_PLUS:
                        return new BinaryPlusBall(removeSelf);
                    case FunctionType.BINARY_MULTIPLY:
                        return new BinaryMultiplyBall(removeSelf);
                    case FunctionType.BINARY_DIVISION:
                        return new BinaryMultiplyBall(removeSelf);
                    case FunctionType.BINARY_EQUAL:
                        return new BinaryEqualBall(removeSelf);
                    case FunctionType.BINARY_NOT_EQUAL:
                        return new BinaryNotEqualBall(removeSelf);
                    case FunctionType.BINARY_GREATER_THAN:
                        return new BinaryGreaterThanBall(removeSelf);
                    case FunctionType.BINARY_GREATER_THAN_OR_EQUAL:
                        return new BinaryGreaterThanOrEqualBall(removeSelf);
                    case FunctionType.BINARY_LESS_THAN:
                        return new BinaryLessThanBall(removeSelf);
                    case FunctionType.BINARY_LESS_THAN_OR_EQUAL:
                        return new BinaryLessThanOrEqualBall(removeSelf);
                    case FunctionType.TERNARY_CONDITIONAL:
                        return new TernaryConditionalBall(removeSelf);
                    case FunctionType.BINARY_MOD:
                        return new BinaryModBall(removeSelf);
                    case FunctionType.DELETE_IF_TRUE:
                        return new DeleteIfTrueBall(removeSelf);
                    case FunctionType.DELETE_IF_FALSE:
                        return new DeleteIfFalseBall(removeSelf);
                    case FunctionType.DUPLICATE:
                        return new DuplicateBall();
                    default:
                        return new MockBallImpl()
                }
            }
            case BallTypeEnum.HIGHER_ORDER_FUNCTION:
                return new SpawnFunctionBall()
            default:
                return new MockBallImpl();
        }
    }

    /**
     * plain objectからデシリアライズ
     * @param obj object
     */
    static deserialize(obj: any) {
        return new BallData(obj.ballType, obj.initialPosition, obj.initialVelocity, new Map(Object.entries(obj.data)));
    }

    /**
     * プレインオブジェクトに尻arise
     */
    serialize(): any {
        return {
            ballType: this.ballType,
            initialPosition: this.initialPosition,
            initialVelocity: this.initialVelocity,
            data: Object.fromEntries(this.data)
        };
    }
}

/**
 * 模擬玉
 */
class MockBallImpl implements BallInterface {
    constructor() {
    }

    ballType(): number {
        return BallTypeEnum.NUMBER
    }

    label(): string {
        return "mock";
    }
}