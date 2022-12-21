import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetMsgModePayload {
    msgMode: string
}

export interface ISetMsgModeAction extends IAction {
    type: ActionType.SET_MSG_MODE,
    payload: ISetMsgModePayload
}

export function setMsgModeAction(msgMode: string): ISetMsgModeAction {
    return {
        type: ActionType.SET_MSG_MODE,
        payload: { msgMode }
    };
}

export const setMsgModeReducer = (state: IViolMsgAppState, action: ISetMsgModeAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            msgMode: action.payload.msgMode
        }
    };
}