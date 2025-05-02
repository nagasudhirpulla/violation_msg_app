import { IAction } from "../typeDefs/action";
import { IVoltViolInfoRow } from "../typeDefs/voltViolInfoRow";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { ActionType } from "./actionType";

export interface ISetVoltInfoRowsPayload {
    voltViolInfoRows: IVoltViolInfoRow[]
}

export interface ISetVoltViolInfoRowsAction extends IAction {
    type: ActionType.SET_VOLT_VIOL_INFO_ROWS,
    payload: ISetVoltInfoRowsPayload
}

export function setVoltViolInfoRowsAction(voltViolInfoRows: IVoltViolInfoRow[]): ISetVoltViolInfoRowsAction {
    return {
        type: ActionType.SET_VOLT_VIOL_INFO_ROWS,
        payload: { voltViolInfoRows }
    };
}

export const setVoltViolInfoRowsReducer = (state: IVoltViolMsgAppState, action: ISetVoltViolInfoRowsAction): IVoltViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            voltViolInfoRows: action.payload.voltViolInfoRows
        }
    };
}