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
    const freq = action.payload.freq
    let systemState: string = "Normal"
    if ((49.85 <= freq && freq < 49.9) || (50.05 < freq && freq <= 50.10)) {
        systemState = "Alert"
    } else if ((49.7 <= freq && freq < 49.85) || (50.1 < freq && freq <= 50.25)) {
        systemState = "Emergency"
    } else if (freq < 49.70 || freq > 50.25) {
        systemState = "Extreme Emergency"
    }
    return {
        ...state,
        ui: {
            ...state.ui,
            freq: freq,
            systemState: systemState
        }
    };
}