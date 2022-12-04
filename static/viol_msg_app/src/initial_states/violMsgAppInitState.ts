import { IViolMsgAppState } from "../typeDefs/violMsgAppState";

const nowDate: Date = new Date()

const initState: IViolMsgAppState = {
    ui: {
        date: nowDate,
        freqPnt: "",
        generators: [],
        constituents: [],
        selectedGens: [],
        selectedCons: [],
        violInfoRows: [],
        freq: 50,
        msgId: `LD/${(nowDate.getMonth() + 1)}/`,
        msgInstructions: "",
        isGenSelected: false,
        violType: "",
        voltViolationMsg: "",
        loadViolationMsg: "",
        zcvViolationMsg: "",
        splEvnts: "",
        distributionMails: "",
        pendingActions: []
    },
    urls: {
        serverBaseUrl: ".."
    }
}

export default initState;