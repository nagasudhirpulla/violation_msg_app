import { IAction } from "../typeDefs/action";
import { IUtilPnt } from "../typeDefs/utilPnt";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetSelectedGensPayload {
    selGensList: IUtilPnt[]
}

export interface ISetSelectedGensAction extends IAction {
    type: ActionType.SET_SELECTED_GENS,
    payload: ISetSelectedGensPayload
}

export function setSelectedGensAction(selGensList: IUtilPnt[]): ISetSelectedGensAction {
    return {
        type: ActionType.SET_SELECTED_GENS,
        payload: { selGensList }
    };
}

export const setSelectedGensReducer = (state: IViolMsgAppState, action: ISetSelectedGensAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            selectedGens: action.payload.selGensList
        }
    };
}