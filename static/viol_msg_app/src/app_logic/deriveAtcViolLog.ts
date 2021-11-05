import moment from 'moment';
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { IAtcViolLog } from "../typeDefs/atcViolLog";

export const deriveAtcViolLog = (state: IAtcViolMsgAppState): IAtcViolLog => {
    const atcViolLog: IAtcViolLog = {
        msgId: state.ui.msgId,
        date: moment(state.ui.date).format("YYYY-MM-DD HH:mm:ss"),
        voltViolationMsg: state.ui.voltViolationMsg,
        loadViolationMsg: state.ui.loadViolationMsg,
        atcInfoRows: state.ui.atcInfoRows
    }
    return atcViolLog
};