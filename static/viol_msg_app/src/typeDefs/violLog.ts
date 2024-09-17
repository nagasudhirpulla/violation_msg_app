import { IViolInfoRow } from "./violInfoRow";

export interface IViolLog {
    msgId: string,
    date: string,
    freq: number,
    violMsgTo: string,
    emailTo: string,
    freqViolationMsg: string,
    voltViolationMsg: string,
    loadViolationMsg: string,
    zcvViolationMsg: string,
    msgInstructions: string,
    splEvnts: string,
    violInfoRows: IViolInfoRow[],
    violType: string,
    shiftIncharge: string
}