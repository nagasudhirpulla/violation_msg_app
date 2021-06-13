import { getMsgInstructions } from "../app_logic/msgInstructions";
import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface IInitMsgInstrucPayload {
    isGen: boolean
}

export interface IInitMsgInstrucAction extends IAction {
    type: ActionType.INIT_MSG_INSTRUCTIONS,
    payload: IInitMsgInstrucPayload
}

export function initMsgInstrucAction(isGen: boolean): IInitMsgInstrucAction {
    return {
        type: ActionType.INIT_MSG_INSTRUCTIONS,
        payload: { isGen }
    };
}

export const initMsgInstrucReducer = (state: IViolMsgAppState, action: IInitMsgInstrucAction): IViolMsgAppState => {
    let msgIns = ""
    // check deviation sign
    if (state.ui.violInfoRows.length > 0) {
        const isViolPossitive = (state.ui.violInfoRows[0].drawal - state.ui.violInfoRows[0].schedule) > 0
        msgIns = getMsgInstructions(action.payload.isGen, isViolPossitive)
    }
    return {
        ...state,
        ui: {
            ...state.ui,
            msgInstructions: msgIns
        }
    };
}