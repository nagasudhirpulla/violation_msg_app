import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetFreqViolMsgPayload {
    msg: string
}

export interface ISetFreqViolMsgAction extends IAction {
    type: ActionType.SET_FREQ_VIOL_MSG,
    payload: ISetFreqViolMsgPayload
}

export function setFreqViolMsgAction(msg: string): ISetFreqViolMsgAction {
    return {
        type: ActionType.SET_FREQ_VIOL_MSG,
        payload: { msg }
    };
}

export const setFreqViolMsgReducer = (state: IViolMsgAppState, action: ISetFreqViolMsgAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            freqViolationMsg: action.payload.msg
        }
    };
}