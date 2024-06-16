
export const BallTypeEnum = {
    OUTPUT: 0,
    INPUT: 1,
    NUMBER: 2,
    FUNCTION: 3,
    HIGHER_ORDER_FUNCTION: 4
}

export function getBallTypeDisplayName(type: number) {
    switch (type) {
        case BallTypeEnum.OUTPUT:
            return "出力"
        case BallTypeEnum.INPUT:
            return "入力"
        case BallTypeEnum.NUMBER:
            return "数"
        case BallTypeEnum.FUNCTION:
            return "関数"
        case BallTypeEnum.HIGHER_ORDER_FUNCTION:
            return "高階関数"
        default:
            return "エラー"
    }
}