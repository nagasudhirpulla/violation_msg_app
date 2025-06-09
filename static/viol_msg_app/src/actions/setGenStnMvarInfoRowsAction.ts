import { IAction } from "../typeDefs/action";
import { IGenStnMvarInfoRow } from "../typeDefs/genStnMvarInfoRow";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { ActionType } from "./actionType";

export interface ISetGenStnMvarInfoRowsPayload {
    genStnMvarInfoRows: IGenStnMvarInfoRow[]
}

export interface ISetGenStnMvarInfoRowsAction extends IAction {
    type: ActionType.SET_GEN_STN_MVAR_INFO_ROWS,
    payload: ISetGenStnMvarInfoRowsPayload
}

export function setGenStnMvarInfoRowsAction(genStnMvarInfoRows: IGenStnMvarInfoRow[]): ISetGenStnMvarInfoRowsAction {
    return {
        type: ActionType.SET_GEN_STN_MVAR_INFO_ROWS,
        payload: { genStnMvarInfoRows }
    };
}

export const setGenStnMvarInfoRowsReducer = (state: IVoltViolMsgAppState, action: ISetGenStnMvarInfoRowsAction): IVoltViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            genStnMvarInfoRows: action.payload.genStnMvarInfoRows
        }
    };
}