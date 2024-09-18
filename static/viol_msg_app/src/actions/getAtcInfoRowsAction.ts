import { fetchAtcRows } from "../services/fetchAtcRows";
import { IAction } from "../typeDefs/action";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { IStateUtilPnt } from "../typeDefs/stateUtilPnt";
import { ActionType } from "./actionType";
import { setAtcInfoRowsAction } from "./setAtcViolRowsAction";
import { setRecipientAddrAction } from "./setRecipientAddrAction";
import { setRecipientEmailsAction } from "./setRecipientEmailsAction";

export interface IGetAtcInfoRowsPayload {
    utils: IStateUtilPnt[]
}

export interface IGetAtcInfoRowsAction extends IAction {
    type: ActionType.GET_ATC_INFO_ROWS,
    payload: IGetAtcInfoRowsPayload
}

export function getAtcInfoRowsAction(utils: IStateUtilPnt[]): IGetAtcInfoRowsAction {
    return {
        type: ActionType.GET_ATC_INFO_ROWS,
        payload: { utils }
    };
}

export const getAtcInfoRowsDispatch = async (action: IGetAtcInfoRowsAction, pageState: IAtcViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    let utils = action.payload.utils
    const receiversStr = "To: " + utils.map(x => x.name).join(", ")
    pageStateDispatch(setRecipientAddrAction(receiversStr))

    // set the distribution emails list
    let emailListStr = utils.filter(u => u.email.trim().length > 0).map(u => u.email).join(";")
    pageStateDispatch(setRecipientEmailsAction(emailListStr))

    const atcRows = await fetchAtcRows(pageState.urls.serverBaseUrl, utils)
    pageStateDispatch(setAtcInfoRowsAction(atcRows))
}