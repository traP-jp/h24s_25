import BallData from "@/ts/data/BallData";
import {setDoc, doc, getDoc} from "firebase/firestore";
import {db} from "@/main";

export default class GameData {
    constructor() {}
    balls: Map<string, BallData> = new Map();

    save(key: string): Promise<void> {
        const data: any = {};
        for(const entry of this.balls.entries()) {
            data[entry[0]] = entry[1].serialize();
        }
        return setDoc(doc(db, "savedata", key), data).then(r => {console.log("saved into " + key)});
    }

    load(key: string): Promise<void> {
        return getDoc(doc(db, "savedata", key)).then((doc) => {
            this.balls = new Map<string, BallData>();
            if(doc.exists()) {
                const data = doc.data();
                for(const key in data) {
                    this.balls.set(key, BallData.deserialize(data[key]));
                }
                console.log("loaded from " + key);
            }
        })
    }
}