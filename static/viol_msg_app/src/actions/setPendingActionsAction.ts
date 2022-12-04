import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetPendingActionsPayload {
    pendingActions:IAction[]
}

export interface ISetPendingActionsAction extends IAction {
    type: ActionType.SET_PENDING_ACTIONS,
    payload: ISetPendingActionsPayload
}

export function setPendingActionsAction(pendingActions:IAction[]): ISetPendingActionsAction {
    return {
        type: ActionType.SET_PENDING_ACTIONS,
        payload: {pendingActions}
    };
}

export const setPendingActionsReducer = (state: IViolMsgAppState, action: ISetPendingActionsAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            pendingActions: action.payload.pendingActions,
        }
    };
}