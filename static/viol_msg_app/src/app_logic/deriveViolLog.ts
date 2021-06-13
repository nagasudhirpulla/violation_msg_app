import { IViolLog } from "../typeDefs/violLog";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import moment from 'moment';

export const deriveViolLog = (state: IViolMsgAppState): IViolLog => {
    const violLog: IViolLog = {
        freq: state.ui.freq,
        msgId: state.ui.msgId,
        date: moment(state.ui.date).format("YYYY-MM-DD hh:mm:ss"),
        violInfoRows: state.ui.violInfoRows,
        msgInstructions: state.ui.msgInstructions,
        violType: state.ui.violType
    }
    return violLog
};