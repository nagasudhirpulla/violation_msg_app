import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetMsgTimePayload {
    msgTime: Date
}

export interface ISetMsgTimeAction extends IAction {
    type: ActionType.SET_MSG_TIME,
    payload: ISetMsgTimePayload
}

export function setMsgTimeAction(msgTime: Date): ISetMsgTimeAction {
    return {
        type: ActionType.SET_MSG_TIME,
        payload: { msgTime }
    };
}

export const setMsgTimeReducer = (state: IViolMsgAppState, action: ISetMsgTimeAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            date: action.payload.msgTime
        }
    } as IViolMsgAppState;
}