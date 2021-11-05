import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";

const nowDate: Date = new Date()

const initState: IAtcViolMsgAppState = {
    ui: {
        date: nowDate,
        constituents: [],
        msgId: `LD/${(nowDate.getMonth() + 1)}/`,
        recipientsStr: "To: Shift In Charge",
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