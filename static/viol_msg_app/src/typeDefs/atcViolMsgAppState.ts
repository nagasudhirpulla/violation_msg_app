import { IAtcInfoRow } from "./atcInfoRow";
import { IStateUtilPnt } from "./stateUtilPnt";

export interface IAtcViolMsgAppState {
    ui: {
        date: Date,
        constituents: IStateUtilPnt[],
        msgId: string,
        recipientsStr: string,
        voltViolationMsg: string,
        loadViolationMsg: string,
        atcInfoRows: IAtcInfoRow[],
        sInChargeStr: string
    },
    urls: {
        serverBaseUrl: string
    }
}