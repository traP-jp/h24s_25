import {OutputBallInterface} from "@/ts/ballInterface";

export class OutputBallImpl extends OutputBallInterface {
    override outputIndex: number
    constructor(outputIndex: number) {
        super();
        this.outputIndex = outputIndex
    }

    override label(): string {
        return "out" + this.outputIndex;
    }
}