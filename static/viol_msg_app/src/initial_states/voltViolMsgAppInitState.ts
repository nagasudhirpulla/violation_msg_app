import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";

const nowDate: Date = new Date()

const initState: IVoltViolMsgAppState = {
    ui: {
        date: nowDate,
        constituents: [],
        msgId: `LD/${(nowDate.getMonth() + 1)}/`,
        recipientsStr: "To: ",
        recipientMails: "",
        violMsgTo: "",
        voltViolInfoRows: [],
        genStnMvarInfoRows: [],
        sInChargeStr: ""
    },
    urls: {
        serverBaseUrl: ".."
    }
}

export default initState;