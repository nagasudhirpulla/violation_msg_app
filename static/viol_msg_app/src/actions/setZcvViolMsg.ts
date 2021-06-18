import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetZcvViolMsgPayload {
    msg: string
}

export interface ISetZcvViolMsgAction extends IAction {
    type: ActionType.SET_ZCV_VIOL_MSG,
    payload: ISetZcvViolMsgPayload
}

export function setZcvViolMsgAction(msg: string): ISetZcvViolMsgAction {
    return {
        type: ActionType.SET_ZCV_VIOL_MSG,
        payload: { msg }
    };
}

export const setZcvViolMsgReducer = (state: IViolMsgAppState, action: ISetZcvViolMsgAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            zcvViolationMsg: action.payload.msg
        }
    };
}