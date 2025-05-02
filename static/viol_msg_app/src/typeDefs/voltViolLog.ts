import { IVoltViolInfoRow } from "./voltViolInfoRow";
import { IGenStnMvarInfoRow } from "./genStnMvarInfoRow";

export interface IVoltViolLog {
    msgId: string,
    date: string,
    violMsgTo: string,
    emailTo: string,
    voltViolInfoRows: IVoltViolInfoRow[],
    genStnMvarInfoRows: IGenStnMvarInfoRow[],
    shiftIncharge: string
}