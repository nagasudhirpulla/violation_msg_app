import { IAction } from "../typeDefs/action";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { ActionType } from "./actionType";

export interface ISetRecipientAddrPayload {
    recipientsStr: string
}

export interface ISetRecipientAddrAction extends IAction {
    type: ActionType.SET_RECIPIENT_ADDR,
    payload: ISetRecipientAddrPayload
}

export function setRecipientAddrAction(recipientsStr: string): ISetRecipientAddrAction {
    return {
        type: ActionType.SET_RECIPIENT_ADDR,
        payload: { recipientsStr }
    };
}

export const setAtcPageRecipientAddrReducer = (state: IAtcViolMsgAppState, action: ISetRecipientAddrAction): IAtcViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            recipientsStr: action.payload.recipientsStr
        }
    };
}

export const setVoltViolPageRecipientAddrReducer = (state: IVoltViolMsgAppState, action: ISetRecipientAddrAction): IVoltViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            recipientsStr: action.payload.recipientsStr
        }
    };
}