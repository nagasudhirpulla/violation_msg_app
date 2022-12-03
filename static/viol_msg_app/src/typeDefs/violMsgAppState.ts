import { IUtilPnt } from "./utilPnt";
import { IViolInfoRow } from "./violInfoRow";

export interface IViolMsgAppState {
    ui: {
        date: Date,
        freqPnt: string,
        generators: IUtilPnt[],
        constituents: IUtilPnt[],
        selectedGens: IUtilPnt[],
        selectedCons: IUtilPnt[],
        msgId: string,
        freq: number,
        voltViolationMsg: string,
        loadViolationMsg: string,
        zcvViolationMsg: string,
        msgInstructions: string,
        splEvnts: string,
        isGenSelected: boolean,
        violInfoRows: IViolInfoRow[],
        violType: string,
        distributionMails: string
    },
    urls: {
        serverBaseUrl: string
    }
}