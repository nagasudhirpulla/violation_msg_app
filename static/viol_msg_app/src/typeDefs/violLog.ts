import { IViolInfoRow } from "./violInfoRow";

export interface IViolLog {
    freq: number,
    msgId: string,
    date: string,
    violInfoRows: IViolInfoRow[],
    msgInstructions: string,
    violType: string
}