import { MsgModes } from "../initial_states/violMsgAppInitState";
import { fetchAlertUnderInjSellerIndices } from "../services/fetchAlertUnderInjSellerIndices";
import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";
import { setMsgModeAction } from "./setMsgModeAction";
import { setSelectedGensAction } from "./setSelectedGensAction";

export interface IGetAlertUnderInjSellersPayload {
}

export interface IGetAlertUnderInjSellersAction extends IAction {
    type: ActionType.SUGGEST_ALERT_UNDER_INJ_SELLERS,
    payload: IGetAlertUnderInjSellersPayload
}

export function getAlertUnderInjSellersAction(): IGetAlertUnderInjSellersAction {
    return {
        type: ActionType.SUGGEST_ALERT_UNDER_INJ_SELLERS,
        payload: {}
    };
}

export const getAlertUnderInjSellersDispatch = async (action: IGetAlertUnderInjSellersAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const underInjSellerIndices = await fetchAlertUnderInjSellerIndices(pageState.urls.serverBaseUrl)
    const sellers = underInjSellerIndices.map(x => pageState.ui.generators[x])
    pageStateDispatch(setSelectedGensAction(sellers))
    pageStateDispatch(setMsgModeAction(MsgModes.ALERT))
}