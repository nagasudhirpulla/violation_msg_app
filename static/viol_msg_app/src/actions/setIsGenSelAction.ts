import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetIsGenSelPayload {
    isGenSel: boolean
}

export interface ISetIsGenSelAction extends IAction {
    type: ActionType.SET_IS_GEN_SEL,
    payload: ISetIsGenSelPayload
}

export function setIsGenSelAction(isGenSel: boolean): ISetIsGenSelAction {
    return {
        type: ActionType.SET_IS_GEN_SEL,
        payload: { isGenSel }
    };
}

export const setIsGenSelReducer = (state: IViolMsgAppState, action: ISetIsGenSelAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            isGenSelected: action.payload.isGenSel
        }
    };
}