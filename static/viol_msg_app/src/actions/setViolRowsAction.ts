import { IAction } from "../typeDefs/action";
import { IAppConfig } from "../typeDefs/appConfig";
import { IViolInfoRow } from "../typeDefs/violInfoRow";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetViolRowsPayload {
    violRows: IViolInfoRow[]
}

export interface ISetViolRowsAction extends IAction {
    type: ActionType.SET_VIOLATION_ROWS,
    payload: ISetViolRowsPayload
}

export function setViolRowsAction(violRows: IViolInfoRow[]): ISetViolRowsAction {
    return {
        type: ActionType.SET_VIOLATION_ROWS,
        payload: { violRows }
    };
}

export const setViolRowsReducer = (state: IViolMsgAppState, action: ISetViolRowsAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            violInfoRows: action.payload.violRows
        }
    } as IViolMsgAppState;
}