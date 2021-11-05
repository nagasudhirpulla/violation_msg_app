import { IAction } from "../typeDefs/action";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetVoltViolMsgPayload {
    msg: string
}

export interface ISetVoltViolMsgAction extends IAction {
    type: ActionType.SET_VOLT_VIOL_MSG,
    payload: ISetVoltViolMsgPayload
}

export function setVoltViolMsgAction(msg: string): ISetVoltViolMsgAction {
    return {
        type: ActionType.SET_VOLT_VIOL_MSG,
        payload: { msg }
    };
}

export const setVoltViolMsgReducer = (state: IViolMsgAppState, action: ISetVoltViolMsgAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            voltViolationMsg: action.payload.msg
        }
    };
}

export const setAtcPageVoltViolMsgReducer = (state: IAtcViolMsgAppState, action: ISetVoltViolMsgAction): IAtcViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            voltViolationMsg: action.payload.msg
        }
    };
}