import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";

const nowDate: Date = new Date()

const initState: IAtcViolMsgAppState = {
    ui: {
        date: nowDate,
        constituents: [],
        msgId: `LD/${(nowDate.getMonth() + 1)}/`,
        recipientsStr: "To: ",
        violMsgTo: "",
        voltViolationMsg: "",
        loadViolationMsg: "",
        atcInfoRows: [],
        sInChargeStr: ""
    },
    urls: {
        serverBaseUrl: ".."
    }
}

export default initState;