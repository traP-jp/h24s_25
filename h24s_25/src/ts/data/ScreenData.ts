import BallData from "@/ts/data/BallData";
import {setDoc, doc, getDoc} from "firebase/firestore";
import {db} from "@/main";

/**
 * スクリーンのデータを表すクラス
 */
export default class ScreenData {
    constructor() {}

    /**
     * 空間に存在するすべての玉
     */
    balls: Map<string, BallData> = new Map();

    /**
     * firestoreにデータを保存
     * @param key キー
     */
    save(key: string): Promise<void> {
        console.log(this.balls)
        const data: any = {};
        for(const entry of this.balls.entries()) {
            data[entry[0]] = entry[1].serialize();
        }
        return setDoc(doc(db, "savedata", key), data).then(() => {console.log("saved into " + key)});
    }

    /**
     * firestoreからデータを読み込む
     * @param key キー
     */
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