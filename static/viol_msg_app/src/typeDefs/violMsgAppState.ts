import { IUtilPnt } from "./utilPnt";
import { IViolInfoRow } from "./violInfoRow";

export interface IViolMsgAppState {
    ui: {
        date: Date,
        freqPnt: string,
        generators: IUtilPnt[],
        constituents: IUtilPnt[],
        violInfoRows: IViolInfoRow[],
        freq: number,
        msgId: string,
        msgInstructions: string,
        isGenSelected: boolean,
        violType: string
    },
    urls: {
        serverBaseUrl: string
    }
}