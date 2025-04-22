import { MsgModes } from "../initial_states/violMsgAppInitState";
import { fetchAlertOverInjSellerIndices } from "../services/fetchAlertOverInjSellerIndices";
import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";
import { setMsgModeAction } from "./setMsgModeAction";
import { setSelectedGensAction } from "./setSelectedGensAction";

export interface IGetAlertOverInjSellersPayload {
}

export interface IGetAlertOverInjSellersAction extends IAction {
    type: ActionType.SUGGEST_ALERT_OVER_INJ_SELLERS,
    payload: IGetAlertOverInjSellersPayload
}

export function getAlertOverInjSellersAction(): IGetAlertOverInjSellersAction {
    return {
        type: ActionType.SUGGEST_ALERT_OVER_INJ_SELLERS,
        payload: {}
    };
}

export const getAlertOverInjSellersDispatch = async (action: IGetAlertOverInjSellersAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const overInjSellerIndices = await fetchAlertOverInjSellerIndices(pageState.urls.serverBaseUrl)
    const sellers = overInjSellerIndices.map(x => pageState.ui.generators[x])
    pageStateDispatch(setSelectedGensAction(sellers))
    pageStateDispatch(setMsgModeAction(MsgModes.ALERT))
}