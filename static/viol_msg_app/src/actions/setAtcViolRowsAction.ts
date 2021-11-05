import { IAction } from "../typeDefs/action";
import { IAtcInfoRow } from "../typeDefs/atcInfoRow";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { ActionType } from "./actionType";

export interface ISetAtcInfoRowsPayload {
    atcInfoRows: IAtcInfoRow[]
}

export interface ISetAtcInfoRowsAction extends IAction {
    type: ActionType.SET_ATC_INFO_ROWS,
    payload: ISetAtcInfoRowsPayload
}

export function setAtcInfoRowsAction(atcInfoRows: IAtcInfoRow[]): ISetAtcInfoRowsAction {
    return {
        type: ActionType.SET_ATC_INFO_ROWS,
        payload: { atcInfoRows }
    };
}

export const setAtcInfoRowsReducer = (state: IAtcViolMsgAppState, action: ISetAtcInfoRowsAction): IAtcViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            atcInfoRows: action.payload.atcInfoRows
        }
    };
}