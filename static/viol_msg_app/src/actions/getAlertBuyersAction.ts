import { fetchAlertBuyerIndices } from "../services/fetchAlertBuyerIndices";
import { IAction } from "../typeDefs/action";
import { IUtilPnt } from "../typeDefs/utilPnt";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface IGetAlertBuyersPayload {
    setSelCons: React.Dispatch<React.SetStateAction<IUtilPnt[]>>
}

export interface IGetAlertBuyersAction extends IAction {
    type: ActionType.SUGGEST_ALERT_BUYERS,
    payload: IGetAlertBuyersPayload
}

export function getAlertBuyersAction(setSelCons: React.Dispatch<React.SetStateAction<IUtilPnt[]>>): IGetAlertBuyersAction {
    return {
        type: ActionType.SUGGEST_ALERT_BUYERS,
        payload: { setSelCons }
    };
}

export const getAlertBuyersDispatch = async (action: IGetAlertBuyersAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const buyerIndices = await fetchAlertBuyerIndices(pageState.urls.serverBaseUrl)
    const buyers = buyerIndices.map(x => pageState.ui.constituents[x])
    action.payload.setSelCons(buyers)
}