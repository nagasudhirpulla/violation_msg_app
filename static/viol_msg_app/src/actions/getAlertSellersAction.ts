import { fetchAlertSellerIndices } from "../services/fetchAlertSellerIndices";
import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";
import { setSelectedGensAction } from "./setSelectedGensAction";

export interface IGetAlertSellersPayload {
}

export interface IGetAlertSellersAction extends IAction {
    type: ActionType.SUGGEST_ALERT_SELLERS,
    payload: IGetAlertSellersPayload
}

export function getAlertSellersAction(): IGetAlertSellersAction {
    return {
        type: ActionType.SUGGEST_ALERT_SELLERS,
        payload: {}
    };
}

export const getAlertSellersDispatch = async (action: IGetAlertSellersAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const sellerIndices = await fetchAlertSellerIndices(pageState.urls.serverBaseUrl)
    const sellers = sellerIndices.map(x => pageState.ui.generators[x])
    pageStateDispatch(setSelectedGensAction(sellers))
}