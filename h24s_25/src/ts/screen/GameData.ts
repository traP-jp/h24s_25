import type BallData from "@/ts/screen/BallData";

export default class GameData {
    constructor() {}
    balls: Map<string, BallData> = new Map();

}