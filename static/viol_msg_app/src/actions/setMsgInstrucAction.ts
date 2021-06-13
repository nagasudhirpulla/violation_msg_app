import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetMsgInstrucPayload {
    ins: string
}

export interface ISetMsgInstrucAction extends IAction {
    type: ActionType.SET_MSG_INSTRUCTIONS,
    payload: ISetMsgInstrucPayload
}

export function setMsgInstrucAction(ins: string): ISetMsgInstrucAction {
    return {
        type: ActionType.SET_MSG_INSTRUCTIONS,
        payload: { ins }
    };
}

export const setMsgInstrucReducer = (state: IViolMsgAppState, action: ISetMsgInstrucAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            msgInstructions: action.payload.ins
        }
    };
}