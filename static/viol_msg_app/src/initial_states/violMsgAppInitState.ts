import { IViolMsgAppState } from "../typeDefs/violMsgAppState";

const nowDate: Date = new Date()

export enum MsgModes {
    ALERT = 'ALERT / चेतावनी',
    EMERGENCY = 'EMERGENCY / आपातकालीन',
    NON_COMPLIANCE = 'NON COMPLIANCE / गैर अनुपालन',
}

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
        systemState: "Normal",
        msgId: `LD/${(nowDate.getMonth() + 1)}/`,
        msgInstructions: "",
        isGenSelected: false,
        violType: "",
        freqViolationMsg: "",
        voltViolationMsg: "",
        loadViolationMsg: "",
        zcvViolationMsg: "",
        splEvnts: "",
        distributionMails: "",
        distributionNames: "",
        pendingActions: [],
        shiftIncharge: "",
        msgMode: MsgModes.ALERT
    },
    urls: {
        serverBaseUrl: ".."
    }
}

export default initState;