import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetSplEvntsPayload {
    msg: string
}

export interface ISetSplEvntsAction extends IAction {
    type: ActionType.SET_SPL_EVNTS,
    payload: ISetSplEvntsPayload
}

export function setSplEvntsAction(msg: string): ISetSplEvntsAction {
    return {
        type: ActionType.SET_SPL_EVNTS,
        payload: { msg }
    };
}

export const setSplEvntsReducer = (state: IViolMsgAppState, action: ISetSplEvntsAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            splEvnts: action.payload.msg
        }
    };
}