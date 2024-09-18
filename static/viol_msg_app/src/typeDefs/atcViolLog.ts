import { IAtcInfoRow } from "./atcInfoRow";

export interface IAtcViolLog {
    msgId: string,
    date: string,
    violMsgTo: string,
    emailTo: string,
    voltViolationMsg: string,
    loadViolationMsg: string,
    atcInfoRows: IAtcInfoRow[],
    shiftIncharge: string
}