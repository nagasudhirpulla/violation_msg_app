import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetDistributionNamesPayload {
    names: string
}

export interface ISetDistributionNamesAction extends IAction {
    type: ActionType.SET_DISTRIBUTION_NAMES,
    payload: ISetDistributionNamesPayload
}

export function setDistributionNamesAction(names: string): ISetDistributionNamesAction {
    return {
        type: ActionType.SET_DISTRIBUTION_NAMES,
        payload: { names: names }
    };
}

export const setDistributionNamesReducer = (state: IViolMsgAppState, action: ISetDistributionNamesAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            distributionNames: action.payload.names
        }
    };
}