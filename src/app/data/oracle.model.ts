import { IRoll } from "./roll.model";
import { ITable } from "./table.model";

export interface IOracle {
    title: string
    type: string,
    // table: ITable,
    table: string[][][],
    rollCaps: IRoll,
    useLikely: boolean,
    howLikely: string,
}

export enum oracleType {
    yesNo = 'yesNo',
}