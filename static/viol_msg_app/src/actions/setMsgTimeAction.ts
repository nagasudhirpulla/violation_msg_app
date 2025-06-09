import { IAction } from "../typeDefs/action";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
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
    };
}

export const setAtcPageMsgTimeReducer = (state: IAtcViolMsgAppState, action: ISetMsgTimeAction): IAtcViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            date: action.payload.msgTime
        }
    };
}

export const setVoltViolPageMsgTimeReducer = (state: IVoltViolMsgAppState, action: ISetMsgTimeAction): IVoltViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            date: action.payload.msgTime
        }
    };
}