import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetFreqPayload {
    freq: number
}

export interface ISetFreqAction extends IAction {
    type: ActionType.SET_FREQ,
    payload: ISetFreqPayload
}

export function setFreqAction(freq: number): ISetFreqAction {
    return {
        type: ActionType.SET_FREQ,
        payload: { freq }
    };
}

export const setFreqReducer = (state: IViolMsgAppState, action: ISetFreqAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            freq: action.payload.freq
        }
    } as IViolMsgAppState;
}