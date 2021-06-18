import { IViolMsgAppState } from "../typeDefs/violMsgAppState";

const nowDate: Date = new Date()

const initState: IViolMsgAppState = {
    ui: {
        date: nowDate,
        freqPnt: "",
        generators: [],
        constituents: [],
        violInfoRows: [],
        freq: 50,
        msgId: `LD/${(nowDate.getMonth() + 1)}/`,
        msgInstructions: "",
        isGenSelected: false,
        violType: "",
        voltViolationMsg: "",
        loadViolationMsg: "",
        zcvViolationMsg: "",
        splEvnts: ""
    },
    urls: {
        serverBaseUrl: ".."
    }
}

export default initState;