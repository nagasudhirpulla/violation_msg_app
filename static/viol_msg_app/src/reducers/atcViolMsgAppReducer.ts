import { useReducer, useEffect, useCallback } from "react";
import { getAppConfigAction } from "../actions/getAppConfigAction";
import { fetchAppConfig } from "../services/fetchAppConfig";
import { ISetAppConfigAction, setAppConfigAction, setAtcPageAppConfigReducer } from "../actions/setAppConfigAction";
import { ActionType } from "../actions/actionType";
import { IAction } from "../typeDefs/action";
import { ISetMsgTimeAction, setAtcPageMsgTimeReducer } from "../actions/setMsgTimeAction";
import { ISetMsgIdAction, setAtcPageMsgIdReducer } from "../actions/setMsgIdAction";
import { ISetVoltViolMsgAction, setAtcPageVoltViolMsgReducer } from "../actions/setVoltViolMsgAction";
import { ISetLoadViolMsgAction, setAtcPageLoadViolMsgReducer } from "../actions/setLoadViolMsgAction";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { ISetAtcInfoRowsAction, setAtcInfoRowsReducer } from "../actions/setAtcViolRowsAction";
import { ISetShInchAction, setAtcPageShInchReducer } from "../actions/setShInchAction";
import { ISetRecipientAddrAction, setAtcPageRecipientAddrReducer } from "../actions/setRecipientAddrAction";
import { getAtcInfoRowsDispatch, IGetAtcInfoRowsAction } from "../actions/getAtcInfoRowsAction";
import { ISaveAtcViolLogAction, saveAtcViolLogDispatch } from "../actions/saveAtcViolLogAction";

export const useAtcViolMsgAppReducer = (initState: IAtcViolMsgAppState): [IAtcViolMsgAppState, React.Dispatch<IAction>] => {
    // create the reducer function
    const reducer = (state: IAtcViolMsgAppState, action: IAction): IAtcViolMsgAppState => {
        switch (action.type) {
            case ActionType.SET_APP_CONFIG:
                return setAtcPageAppConfigReducer(state, action as ISetAppConfigAction)
            case ActionType.SET_ATC_INFO_ROWS:
                return setAtcInfoRowsReducer(state, action as ISetAtcInfoRowsAction)
            case ActionType.SET_MSG_TIME:
                return setAtcPageMsgTimeReducer(state, action as ISetMsgTimeAction)
            case ActionType.SET_MSG_ID:
                return setAtcPageMsgIdReducer(state, action as ISetMsgIdAction)
            case ActionType.SET_VOLT_VIOL_MSG:
                return setAtcPageVoltViolMsgReducer(state, action as ISetVoltViolMsgAction)
            case ActionType.SET_LOAD_VIOL_MSG:
                return setAtcPageLoadViolMsgReducer(state, action as ISetLoadViolMsgAction)
            case ActionType.SET_RECIPIENT_ADDR:
                return setAtcPageRecipientAddrReducer(state, action as ISetRecipientAddrAction)
            case ActionType.SET_SH_INCH:
                return setAtcPageShInchReducer(state, action as ISetShInchAction)
            default:
                console.log("unwanted action detected");
                console.log(JSON.stringify(action));
                //throw new Error();
                return state;
            // return state also works
        }
    }

    // create the reducer hook
    let [pageState, pageStateDispatch]: [IAtcViolMsgAppState, React.Dispatch<IAction>] = useReducer(reducer, initState)

    // update appConfig from server
    useEffect(() => {
        (async function () {
            asyncDispatch(getAppConfigAction())
        })();
    }, [pageState.urls.serverBaseUrl]);

    // created middleware to intercept dispatch calls that require async operations
    const asyncDispatch: React.Dispatch<IAction> = useCallback(async (action) => {
        switch (action.type) {
            case ActionType.GET_APP_CONFIG: {
                const appConfig = await fetchAppConfig(pageState.urls.serverBaseUrl)
                pageStateDispatch(setAppConfigAction(appConfig));
                break;
            }
            case ActionType.GET_ATC_INFO_ROWS: {
                await getAtcInfoRowsDispatch(action as IGetAtcInfoRowsAction, pageState, pageStateDispatch)
                break;
            }
            case ActionType.SAVE_VIOL_LOG: {
                await saveAtcViolLogDispatch(action as ISaveAtcViolLogAction, pageState, pageStateDispatch)
                break;
            }
            default:
                pageStateDispatch(action);
        }
    }, [pageState.urls.serverBaseUrl]); // The empty array causes this callback to only be created once per component instance

    return [pageState, asyncDispatch];
}