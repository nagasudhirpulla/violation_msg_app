import { IAction } from "../typeDefs/action";
import { IUtilPnt } from "../typeDefs/utilPnt";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetSelectedConsPayload {
    selConsList: IUtilPnt[]
}

export interface ISetSelectedConsAction extends IAction {
    type: ActionType.SET_SELECTED_CONS,
    payload: ISetSelectedConsPayload
}

export function setSelectedConsAction(selConsList: IUtilPnt[]): ISetSelectedConsAction {
    return {
        type: ActionType.SET_SELECTED_CONS,
        payload: { selConsList }
    };
}

export const setSelectedConsReducer = (state: IViolMsgAppState, action: ISetSelectedConsAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            selectedCons: action.payload.selConsList
        }
    };
}