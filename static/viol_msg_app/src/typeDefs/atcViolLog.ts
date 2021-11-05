import { IAtcInfoRow } from "./atcInfoRow";

export interface IAtcViolLog {
    msgId: string,
    date: string,
    voltViolationMsg: string,
    loadViolationMsg: string,
    atcInfoRows: IAtcInfoRow[]
}