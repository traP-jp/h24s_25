import {BallTypeEnum} from "@/ts/balltypes";
import {type BallInterface} from "@/ts/ballInterface";

export default class BallData {
    ballType: BallTypeEnum;
    initialPosition: {x: number, y: number};
    initialVelocity: {x: number, y: number};
    data: any;
    constructor(ballType: BallTypeEnum, initialPosition: {x: number, y: number}, initialVelocity: {x: number, y: number}, data: any) {
        this.ballType = ballType;
        this.initialPosition = initialPosition;
        this.initialVelocity = initialVelocity;
        this.data = data;
    }

    createBall(): BallInterface {
        return new MockBallImpl(this.initialPosition,this.initialVelocity);
    }
}
class MockBallImpl implements BallInterface {
    position: { x: number; y: number };
    velocity: { x: number; y: number };

    constructor(position: {x: number, y: number}, velocity: {x:number, y:number}) {
        this.position = position;
        this.velocity = velocity;
    }
    ballType(): BallTypeEnum {
        return BallTypeEnum.NUMBER
    }

    label(): string {
        return "";
    }
}