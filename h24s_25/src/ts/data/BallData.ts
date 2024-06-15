import {BallTypeEnum} from "@/ts/balltypes";
import {type BallInterface} from "@/ts/ballInterface";

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
        return new MockBallImpl(this.initialPosition,this.initialVelocity);
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
    initialPosition: { x: number; y: number };
    initialVelocity: { x: number; y: number };

    constructor(position: {x: number, y: number}, velocity: {x:number, y:number}) {
        this.initialPosition = position;
        this.initialVelocity = velocity;
    }
    ballType(): BallTypeEnum {
        return BallTypeEnum.NUMBER
    }

    label(): string {
        return "";
    }
}