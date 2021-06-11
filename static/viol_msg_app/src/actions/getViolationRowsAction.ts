import { fetchViolRows } from "../services/fetchViolRows";
import { IAction } from "../typeDefs/action";
import { IUtilPnt } from "../typeDefs/utilPnt";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";
import { setViolRowsAction } from "./setViolRowsAction";

export interface IGetViolationRowsPayload {
    utils: IUtilPnt[]
}

export interface IGetViolationRowsAction extends IAction {
    type: ActionType.GET_VIOLATION_ROWS,
    payload: IGetViolationRowsPayload
}

export function getViolationRowsAction(utils: IUtilPnt[]): IGetViolationRowsAction {
    return {
        type: ActionType.GET_VIOLATION_ROWS,
        payload: { utils }
    };
}

export const getViolationRowsDispatch = async (action: IGetViolationRowsAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    let utils = action.payload.utils
    const violRows = await fetchViolRows(pageState.urls.serverBaseUrl, utils)
    pageStateDispatch(setViolRowsAction(violRows))
}