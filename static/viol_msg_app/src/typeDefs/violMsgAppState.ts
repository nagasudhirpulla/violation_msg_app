import { IUtilPnt } from "./utilPnt";
import { IViolInfoRow } from "./violInfoRow";

export interface IViolMsgAppState {
    ui: {
        date: Date,
        freqPnt: string,
        generators: IUtilPnt[],
        constituents: IUtilPnt[],
        msgId: string,
        freq: number,
        voltViolationMsg: string,
        loadViolationMsg: string,
        zcvViolationMsg: string,
        msgInstructions: string,
        splEvnts: string,
        isGenSelected: boolean,
        violInfoRows: IViolInfoRow[],
        violType: string
    },
    urls: {
        serverBaseUrl: string
    }
}