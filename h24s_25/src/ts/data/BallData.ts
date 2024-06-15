import {BallTypeEnum} from "@/ts/balltypes";
import {type BallInterface} from "@/ts/ballInterface";

export default class BallData {
    ballType: BallTypeEnum;
    initialPosition: {x: number, y: number};
    initialVelocity: {x: number, y: number};
    data: Map<string, string>;
    constructor(ballType: BallTypeEnum, initialPosition: {x: number, y: number}, initialVelocity: {x: number, y: number}, data: Map<string, string>) {
        this.ballType = ballType;
        this.initialPosition = initialPosition;
        this.initialVelocity = initialVelocity;
        this.data = data;
    }

    createBall(): BallInterface {
        return new MockBallImpl(this.initialPosition,this.initialVelocity);
    }

    static deserialize(obj: any) {
        return new BallData(obj.ballType, obj.initialPosition, obj.initialVelocity, obj.data);
    }

    serialize(): any {
        return JSON.parse(JSON.stringify(this));
    }
}
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