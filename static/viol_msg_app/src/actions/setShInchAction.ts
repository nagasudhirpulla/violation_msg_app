import { IAction } from "../typeDefs/action";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetShInchPayload {
    shInch: string
}

export interface ISetShInchAction extends IAction {
    type: ActionType.SET_SH_INCH,
    payload: ISetShInchPayload
}

export function setShInchAction(shInch: string): ISetShInchAction {
    return {
        type: ActionType.SET_SH_INCH,
        payload: { shInch }
    };
}

export const setShInchReducer = (state: IViolMsgAppState, action: ISetShInchAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            shiftIncharge: action.payload.shInch
        }
    };
}

export const setAtcPageShInchReducer = (state: IAtcViolMsgAppState, action: ISetShInchAction): IAtcViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            sInChargeStr: action.payload.shInch
        }
    };
}