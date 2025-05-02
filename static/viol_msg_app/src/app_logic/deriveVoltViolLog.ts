import moment from 'moment';
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { IVoltViolLog } from "../typeDefs/voltViolLog";

export const deriveVoltViolLog = (state: IVoltViolMsgAppState): IVoltViolLog => {
    const voltViolLog: IVoltViolLog = {
        msgId: state.ui.msgId,
        date: moment(state.ui.date).format("YYYY-MM-DD HH:mm:ss"),
        violMsgTo: state.ui.recipientsStr,
        emailTo: state.ui.recipientMails,
        voltViolInfoRows: state.ui.voltViolInfoRows,
        genStnMvarInfoRows: state.ui.genStnMvarInfoRows,
        shiftIncharge: state.ui.sInChargeStr
    }
    return voltViolLog
};