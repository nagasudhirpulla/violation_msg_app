import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetViolTypePayload {
    violType: string
}

export interface ISetViolTypeAction extends IAction {
    type: ActionType.SET_VIOL_TYPE,
    payload: ISetViolTypePayload
}

export function setViolTypeAction(violType: string): ISetViolTypeAction {
    return {
        type: ActionType.SET_VIOL_TYPE,
        payload: { violType }
    };
}

export const setViolTypeReducer = (state: IViolMsgAppState, action: ISetViolTypeAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            violType: action.payload.violType
        }
    };
}