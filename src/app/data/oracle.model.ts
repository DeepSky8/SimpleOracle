import { IRoll } from "./roll.model";

export interface IOracle {
    title: string
    type: string,
    table: string[][][],
    rollCaps: IRoll,
}

export enum oracleType {
    yesNo = 'yesNo',
    magnitude = 'magnitude'
}