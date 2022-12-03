import { fetchAlertBuyerIndices } from "../services/fetchAlertBuyerIndices";
import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";
import { setSelectedConsAction } from "./setSelectedConsAction";

export interface IGetAlertBuyersPayload {
}

export interface IGetAlertBuyersAction extends IAction {
    type: ActionType.SUGGEST_ALERT_BUYERS,
    payload: IGetAlertBuyersPayload
}

export function getAlertBuyersAction(): IGetAlertBuyersAction {
    return {
        type: ActionType.SUGGEST_ALERT_BUYERS,
        payload: {}
    };
}

export const getAlertBuyersDispatch = async (action: IGetAlertBuyersAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const buyerIndices = await fetchAlertBuyerIndices(pageState.urls.serverBaseUrl)
    const buyers = buyerIndices.map(x => pageState.ui.constituents[x])
    pageStateDispatch(setSelectedConsAction(buyers))
}