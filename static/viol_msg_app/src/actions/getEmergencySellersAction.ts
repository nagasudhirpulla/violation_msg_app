import { fetchEmergencySellerIndices } from "../services/fetchEmergencySellerIndices";
import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";
import { setSelectedGensAction } from "./setSelectedGensAction";

export interface IGetEmergencySellersPayload {
}

export interface IGetEmergencySellersAction extends IAction {
    type: ActionType.SUGGEST_EMERGENCY_SELLERS,
    payload: IGetEmergencySellersPayload
}

export function getEmergencySellersAction(): IGetEmergencySellersAction {
    return {
        type: ActionType.SUGGEST_EMERGENCY_SELLERS,
        payload: {}
    };
}

export const getEmergencySellersDispatch = async (action: IGetEmergencySellersAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const sellerIndices = await fetchEmergencySellerIndices(pageState.urls.serverBaseUrl)
    const sellers = sellerIndices.map(x => pageState.ui.generators[x])
    pageStateDispatch(setSelectedGensAction(sellers))
}