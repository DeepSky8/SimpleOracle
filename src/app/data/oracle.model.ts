import { IRoll } from "./roll.model";

export interface IOracle {
    iID: number,
    title: string
    type: string,
    defaultPosition: number,
    currentPosition: number,
    pinned: boolean,
    table: string[][][],
    rollCaps: IRoll,
}

// Also must update the body.ts function that selects which component goes with the type
export enum oracleType {
    yesNo = 'yesNo',
    singleroll = 'singleroll',
    multiroll = 'multiroll',
}