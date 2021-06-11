import { IAction } from "../typeDefs/action";
import { ActionType } from "./actionType";

export interface IGetAppConfigPayload {

}

export interface IGetAppConfigAction extends IAction {
    type: ActionType.GET_APP_CONFIG,
    payload: IGetAppConfigPayload
}

export function getAppConfigAction(): IGetAppConfigAction {
    return {
        type: ActionType.GET_APP_CONFIG,
        payload: {}
    };
}