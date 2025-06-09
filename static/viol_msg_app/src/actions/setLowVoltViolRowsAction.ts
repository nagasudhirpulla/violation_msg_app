import { IAction } from "../typeDefs/action";
import { IVoltViolInfoRow } from "../typeDefs/voltViolInfoRow";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { ActionType } from "./actionType";

export interface ISetVoltInfoRowsPayload {
    voltViolInfoRows: IVoltViolInfoRow[]
}

export interface ISetLowVoltViolInfoRowsAction extends IAction {
    type: ActionType.SET_LOW_VOLT_VIOL_INFO_ROWS,
    payload: ISetVoltInfoRowsPayload
}

export function setLowVoltViolInfoRowsAction(voltViolInfoRows: IVoltViolInfoRow[]): ISetLowVoltViolInfoRowsAction {
    return {
        type: ActionType.SET_LOW_VOLT_VIOL_INFO_ROWS,
        payload: { voltViolInfoRows }
    };
}

export const setLowVoltViolInfoRowsReducer = (state: IVoltViolMsgAppState, action: ISetLowVoltViolInfoRowsAction): IVoltViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            voltViolInfoRows: action.payload.voltViolInfoRows
        }
    };
}