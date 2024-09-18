import moment from 'moment';
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { IAtcViolLog } from "../typeDefs/atcViolLog";

export const deriveAtcViolLog = (state: IAtcViolMsgAppState): IAtcViolLog => {
    const atcViolLog: IAtcViolLog = {
        msgId: state.ui.msgId,
        date: moment(state.ui.date).format("YYYY-MM-DD HH:mm:ss"),
        violMsgTo: state.ui.recipientsStr,
        emailTo: state.ui.recipientMails,
        voltViolationMsg: state.ui.voltViolationMsg,
        loadViolationMsg: state.ui.loadViolationMsg,
        atcInfoRows: state.ui.atcInfoRows,
        shiftIncharge: state.ui.sInChargeStr
    }
    return atcViolLog
};