import { IUtilPnt } from "./utilPnt";
import { IViolInfoRow } from "./violInfoRow";

export interface IViolMsgAppState {
    ui: {
        date: Date,
        generators: IUtilPnt[],
        constituents: IUtilPnt[],
        violInfoRows: IViolInfoRow[]
    },
    urls: {
        serverBaseUrl: string
    }
}