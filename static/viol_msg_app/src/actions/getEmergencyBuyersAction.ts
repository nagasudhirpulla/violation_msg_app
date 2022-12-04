import { fetchEmergencyBuyerIndices } from "../services/fetchEmergencyBuyerIndices";
import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";
import { setSelectedConsAction } from "./setSelectedConsAction";

export interface IGetEmergencyBuyersPayload {
}

export interface IGetEmergencyBuyersAction extends IAction {
    type: ActionType.SUGGEST_EMERGENCY_BUYERS,
    payload: IGetEmergencyBuyersPayload
}

export function getEmergencyBuyersAction(): IGetEmergencyBuyersAction {
    return {
        type: ActionType.SUGGEST_EMERGENCY_BUYERS,
        payload: {}
    };
}

export const getEmergencyBuyersDispatch = async (action: IGetEmergencyBuyersAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const buyerIndices = await fetchEmergencyBuyerIndices(pageState.urls.serverBaseUrl)
    const buyers = buyerIndices.map(x => pageState.ui.constituents[x])
    pageStateDispatch(setSelectedConsAction(buyers))
}