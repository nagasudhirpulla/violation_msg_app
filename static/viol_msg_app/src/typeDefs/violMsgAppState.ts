import { IAction } from "./action";
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
        systemState: string,
        freqViolationMsg: string,
        voltViolationMsg: string,
        loadViolationMsg: string,
        zcvViolationMsg: string,
        msgInstructions: string,
        splEvnts: string,
        isGenSelected: boolean,
        violInfoRows: IViolInfoRow[],
        violType: string,
        distributionMails: string,
        distributionNames: string,
        msgMode: string,
        pendingActions: IAction[]
    },
    urls: {
        serverBaseUrl: string
    }
}