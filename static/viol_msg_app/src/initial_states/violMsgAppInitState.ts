import { IViolMsgAppState } from "../typeDefs/violMsgAppState";

const nowDate: Date = new Date()

const initState: IViolMsgAppState = {
    ui: {
        date: nowDate,
        freqPnt: "",
        generators: [],
        constituents: [],
        violInfoRows: [],
        freq: 50
    },
    urls: {
        serverBaseUrl: ".."
    }
}

export default initState;