import { IAction } from "../typeDefs/action";
import { IAppConfig } from "../typeDefs/appConfig";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetAppConfigPayload {
    appConfig: IAppConfig
}

export interface ISetAppConfigAction extends IAction {
    type: ActionType.SET_APP_CONFIG,
    payload: ISetAppConfigPayload
}

export function setAppConfigAction(appConfig: IAppConfig): ISetAppConfigAction {
    return {
        type: ActionType.SET_APP_CONFIG,
        payload: { appConfig }
    };
}

export const setAppConfigReducer = (state: IViolMsgAppState, action: ISetAppConfigAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            generators: action.payload.appConfig.generators,
            constituents: action.payload.appConfig.constituents,
            freqPnt: action.payload.appConfig.freqPnt
        }
    };
}

export const setAtcPageAppConfigReducer = (state: IAtcViolMsgAppState, action: ISetAppConfigAction): IAtcViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            constituents: action.payload.appConfig.constituents
        }
    };
}

export const setVoltViolPageAppConfigReducer = (state: IVoltViolMsgAppState, action: ISetAppConfigAction): IVoltViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            constituents: action.payload.appConfig.constituents
        }
    };
}