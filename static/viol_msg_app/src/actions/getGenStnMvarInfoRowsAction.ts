import { fetchGenStnMvarRows } from "../services/fetchGenStnMvarRows";
import { IAction } from "../typeDefs/action";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { IGenStnUtilPnt } from "../typeDefs/genStnUtilPnt";
import { ActionType } from "./actionType";
import { setGenStnMvarInfoRowsAction } from "./setGenStnMvarInfoRowsAction";
import { setRecipientAddrAction } from "./setRecipientAddrAction";
import { setRecipientEmailsAction } from "./setRecipientEmailsAction";

export interface IGetGenStnMvarInfoRowsPayload {
    genStnUtils: IGenStnUtilPnt[]
}

export interface IGetGenStnMvarInfoRowsAction extends IAction {
    type: ActionType.GET_GEN_STN_MVAR_INFO_ROWS,
    payload: IGetGenStnMvarInfoRowsPayload
}

export function getGenStnMvarInfoRowsAction(genStnUtils: IGenStnUtilPnt[]): IGetGenStnMvarInfoRowsAction {
    return {
        type: ActionType.GET_GEN_STN_MVAR_INFO_ROWS,
        payload: { genStnUtils }
    };
}

export const getGenStnMvarInfoRowsDispatch = async (action: IGetGenStnMvarInfoRowsAction, pageState: IVoltViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    let genStnUtils = action.payload.genStnUtils
    const receiversStr = "To: " + genStnUtils.map(x => x.name).join(", ")
    pageStateDispatch(setRecipientAddrAction(receiversStr))

    // set the distribution emails list
    let emailListStr = genStnUtils.filter(u => u.email.trim().length > 0).map(u => u.email).join(";")
    pageStateDispatch(setRecipientEmailsAction(emailListStr))

    const genStnMvarRows = await fetchGenStnMvarRows(pageState.urls.serverBaseUrl, genStnUtils)
    pageStateDispatch(setGenStnMvarInfoRowsAction(genStnMvarRows))
}