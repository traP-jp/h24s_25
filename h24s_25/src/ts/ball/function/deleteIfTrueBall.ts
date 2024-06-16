import {FunctionBallInterface, NumberBallInterface} from "@/ts/ballInterface";

export class DeleteIfTrueBall extends FunctionBallInterface<DeleteIfTrueBall | null, NumberBallInterface | null> {
    removeSelf: boolean;
    constructor(removeSelf: boolean) {
        super();
        this.removeSelf = removeSelf
    }

    func(x: NumberBallInterface): { self: DeleteIfTrueBall | null; other: NumberBallInterface | null } {
        return {
            self: this.removeSelf ? null : this, other: x.value() == 0 ? x : null
        }
    }

    label(): string {
        return "DIT";
    }
}