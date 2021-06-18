import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetLoadViolMsgPayload {
    msg: string
}

export interface ISetLoadViolMsgAction extends IAction {
    type: ActionType.SET_LOAD_VIOL_MSG,
    payload: ISetLoadViolMsgPayload
}

export function setLoadViolMsgAction(msg: string): ISetLoadViolMsgAction {
    return {
        type: ActionType.SET_LOAD_VIOL_MSG,
        payload: { msg }
    };
}

export const setLoadViolMsgReducer = (state: IViolMsgAppState, action: ISetLoadViolMsgAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            loadViolationMsg: action.payload.msg
        }
    };
}