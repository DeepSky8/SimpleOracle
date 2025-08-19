import { IRoll } from "./roll.model";

export interface IOracle {
    title: string
    type: string,
    table: string[][][],
    rollCaps: IRoll,
}

// Also must update the body.ts function that selects which component goes with the type
export enum oracleType {
    yesNo = 'yesNo',
    magnitude = 'magnitude',
    inspiration = 'inspiration',
}