import { IVoltViolInfoRow } from "./voltViolInfoRow";
import { IGenStnMvarInfoRow } from "./genStnMvarInfoRow";
import { IStateUtilPnt } from "./stateUtilPnt";

export interface IVoltViolMsgAppState {
    ui: {
        date: Date,
        constituents: IStateUtilPnt[],
        msgId: string,
        recipientsStr: string,
        recipientMails: string,
        violMsgTo: string,
        voltViolInfoRows: IVoltViolInfoRow[],
        genStnMvarInfoRows: IGenStnMvarInfoRow[],
        sInChargeStr: string
    },
    urls: {
        serverBaseUrl: string
    }
}