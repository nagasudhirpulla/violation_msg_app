import { IViolMsgAppState } from "../typeDefs/violMsgAppState";

const nowDate: Date = new Date()

const initState: IViolMsgAppState = {
    ui: {
        date: nowDate,
        generators: [],
        constituents: [],
        violInfoRows: []
    },
    urls: {
        serverBaseUrl: ".."
    }
}

export default initState;