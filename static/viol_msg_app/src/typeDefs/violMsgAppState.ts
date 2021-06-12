import { IUtilPnt } from "./utilPnt";
import { IViolInfoRow } from "./violInfoRow";

export interface IViolMsgAppState {
    ui: {
        date: Date,
        freqPnt: string,
        generators: IUtilPnt[],
        constituents: IUtilPnt[],
        violInfoRows: IViolInfoRow[],
        freq: number
    },
    urls: {
        serverBaseUrl: string
    }
}