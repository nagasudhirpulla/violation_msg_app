import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetMsgIdPayload {
    msgId: string
}

export interface ISetMsgIdAction extends IAction {
    type: ActionType.SET_MSG_ID,
    payload: ISetMsgIdPayload
}

export function setMsgIdAction(msgId: string): ISetMsgIdAction {
    return {
        type: ActionType.SET_MSG_ID,
        payload: { msgId }
    };
}

export const setMsgIdReducer = (state: IViolMsgAppState, action: ISetMsgIdAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            msgId: action.payload.msgId
        }
    };
}