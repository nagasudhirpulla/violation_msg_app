import { IViolLog } from "../typeDefs/violLog";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import moment from 'moment';

export const deriveViolLog = (state: IViolMsgAppState): IViolLog => {
    const violLog: IViolLog = {
        msgId: state.ui.msgId,
        date: moment(state.ui.date).format("YYYY-MM-DD HH:mm:ss"),
        freq: state.ui.freq,
        violMsgTo: state.ui.distributionNames,
        emailTo: state.ui.distributionMails,
        freqViolationMsg: state.ui.freqViolationMsg,
        voltViolationMsg: state.ui.voltViolationMsg,
        loadViolationMsg: state.ui.loadViolationMsg,
        zcvViolationMsg: state.ui.zcvViolationMsg,
        msgInstructions: state.ui.msgInstructions,
        splEvnts: state.ui.splEvnts,
        violInfoRows: state.ui.violInfoRows,
        violType: state.ui.violType,
        shiftIncharge: state.ui.shiftIncharge
    }
    return violLog
};