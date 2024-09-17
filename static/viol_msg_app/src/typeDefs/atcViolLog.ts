import { IAtcInfoRow } from "./atcInfoRow";

export interface IAtcViolLog {
    msgId: string,
    date: string,
    violMsgTo: string,
    voltViolationMsg: string,
    loadViolationMsg: string,
    atcInfoRows: IAtcInfoRow[],
    shiftIncharge: string
}