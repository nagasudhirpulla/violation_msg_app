import { useReducer, useEffect, useCallback } from "react";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { getAppConfigAction } from "../actions/getAppConfigAction";
import { fetchAppConfig } from "../services/fetchAppConfig";
import { ISetAppConfigAction, setAppConfigAction, setAppConfigReducer } from "../actions/setAppConfigAction";
import { ActionType } from "../actions/actionType";
import { IAction } from "../typeDefs/action";
import { ISetViolRowsAction, setViolRowsReducer } from "../actions/setViolRowsAction";
import { getViolationRowsAction, getViolationRowsDispatch, IGetViolationRowsAction } from "../actions/getViolationRowsAction";
import { ISetMsgTimeAction, setMsgTimeReducer } from "../actions/setMsgTimeAction";
import { ISetFreqAction, setFreqReducer } from "../actions/setFreqAction";
import { ISetMsgIdAction, setMsgIdReducer } from "../actions/setMsgIdAction";
import { ISetMsgInstrucAction, setMsgInstrucReducer } from "../actions/setMsgInstrucAction";
import { IInitMsgInstrucAction, initMsgInstrucReducer } from "../actions/initMsgInstrucAction";
import { ISetIsGenSelAction, setIsGenSelReducer } from "../actions/setIsGenSelAction";
import { ISetViolTypeAction, setViolTypeReducer } from "../actions/setViolTypeAction";
import { ISaveViolLogAction, saveViolLogDispatch } from "../actions/saveViolLogAction";
import { ISetVoltViolMsgAction, setVoltViolMsgReducer } from "../actions/setVoltViolMsgAction";
import { ISetFreqViolMsgAction, setFreqViolMsgReducer } from "../actions/setFreqViolMsgAction";
import { ISetLoadViolMsgAction, setLoadViolMsgReducer } from "../actions/setLoadViolMsgAction";
import { ISetZcvViolMsgAction, setZcvViolMsgReducer } from "../actions/setZcvViolMsg";
import { ISetSplEvntsAction, setSplEvntsReducer } from "../actions/setSplEvntsAction";
import { ISetDistributionEmailsAction, setDistributionEmailsReducer } from "../actions/setDistributionEmailsAction";
import { getAlertBuyersDispatch, IGetAlertBuyersAction } from "../actions/getAlertBuyersAction";
import { ISetSelectedConsAction, setSelectedConsReducer } from "../actions/setSelectedConsAction";
import { getEmergencyBuyersDispatch, IGetEmergencyBuyersAction } from "../actions/getEmergencyBuyersAction";
import { ISetSelectedGensAction, setSelectedGensReducer } from "../actions/setSelectedGensAction";
import { getAlertSellersDispatch, IGetAlertSellersAction } from "../actions/getAlertSellersAction";
import { getAlertOverInjSellersDispatch, IGetAlertOverInjSellersAction } from "../actions/getAlertOverInjSellersAction";
import { getAlertUnderInjSellersDispatch, IGetAlertUnderInjSellersAction } from "../actions/getAlertUnderInjSellersAction";
import { getEmergencySellersDispatch, IGetEmergencySellersAction } from "../actions/getEmergencySellersAction";
import { ISetPendingActionsAction, setPendingActionsAction, setPendingActionsReducer } from "../actions/setPendingActionsAction";
import { ISetMsgModeAction, setMsgModeReducer } from "../actions/setMsgModeAction";
import { ISetDistributionNamesAction, setDistributionNamesReducer } from "../actions/setDistributionNamesAction";
import { ISetShInchAction, setShInchReducer } from "../actions/setShInchAction";

export const useViolMsgAppReducer = (initState: IViolMsgAppState): [IViolMsgAppState, React.Dispatch<IAction>] => {
    // create the reducer function
    const reducer = (state: IViolMsgAppState, action: IAction): IViolMsgAppState => {
        switch (action.type) {
            case ActionType.SET_APP_CONFIG:
                return setAppConfigReducer(state, action as ISetAppConfigAction)
            case ActionType.SET_VIOLATION_ROWS:
                return setViolRowsReducer(state, action as ISetViolRowsAction)
            case ActionType.SET_MSG_TIME:
                return setMsgTimeReducer(state, action as ISetMsgTimeAction)
            case ActionType.SET_FREQ:
                return setFreqReducer(state, action as ISetFreqAction)
            case ActionType.SET_MSG_ID:
                return setMsgIdReducer(state, action as ISetMsgIdAction)
            case ActionType.INIT_MSG_INSTRUCTIONS:
                return initMsgInstrucReducer(state, action as IInitMsgInstrucAction)
            case ActionType.SET_MSG_INSTRUCTIONS:
                return setMsgInstrucReducer(state, action as ISetMsgInstrucAction)
            case ActionType.SET_IS_GEN_SEL:
                return setIsGenSelReducer(state, action as ISetIsGenSelAction)
            case ActionType.SET_VIOL_TYPE:
                return setViolTypeReducer(state, action as ISetViolTypeAction)
            case ActionType.SET_VOLT_VIOL_MSG:
                return setVoltViolMsgReducer(state, action as ISetVoltViolMsgAction)
            case ActionType.SET_FREQ_VIOL_MSG:
                return setFreqViolMsgReducer(state, action as ISetFreqViolMsgAction)
            case ActionType.SET_LOAD_VIOL_MSG:
                return setLoadViolMsgReducer(state, action as ISetLoadViolMsgAction)
            case ActionType.SET_ZCV_VIOL_MSG:
                return setZcvViolMsgReducer(state, action as ISetZcvViolMsgAction)
            case ActionType.SET_SPL_EVNTS:
                return setSplEvntsReducer(state, action as ISetSplEvntsAction)
            case ActionType.SET_DISTRIBUTION_MAILS:
                return setDistributionEmailsReducer(state, action as ISetDistributionEmailsAction)
            case ActionType.SET_DISTRIBUTION_NAMES:
                return setDistributionNamesReducer(state, action as ISetDistributionNamesAction)
            case ActionType.SET_SELECTED_CONS:
                return setSelectedConsReducer(state, action as ISetSelectedConsAction)
            case ActionType.SET_SELECTED_GENS:
                return setSelectedGensReducer(state, action as ISetSelectedGensAction)
            case ActionType.SET_PENDING_ACTIONS:
                return setPendingActionsReducer(state, action as ISetPendingActionsAction)
            case ActionType.SET_MSG_MODE:
                return setMsgModeReducer(state, action as ISetMsgModeAction)
            case ActionType.SET_SH_INCH:
                return setShInchReducer(state, action as ISetShInchAction)
            default:
                console.log("unwanted action detected");
                console.log(JSON.stringify(action));
                //throw new Error();
                return state;
            // return state also works
        }
    }

    // create the reducer hook
    let [pageState, pageStateDispatch]: [IViolMsgAppState, React.Dispatch<IAction>] = useReducer(reducer, initState)

    // update appConfig from server
    useEffect(() => {
        (async function () {
            asyncDispatch(getAppConfigAction())
        })();
    }, [pageState.urls.serverBaseUrl]);

    // dispatch the first pending action
    useEffect(() => {
        (async function () {
            let pendingActions = pageState.ui.pendingActions
            if (pendingActions.length == 0) { return }
            pageStateDispatch(setPendingActionsAction(pendingActions.slice(1)))
            asyncDispatch(pendingActions[0])
        })();
    }, [pageState.ui.pendingActions]);

    // created middleware to intercept dispatch calls that require async operations
    const asyncDispatch: React.Dispatch<IAction> = useCallback(async (action) => {
        switch (action.type) {
            case ActionType.GET_APP_CONFIG: {
                const appConfig = await fetchAppConfig(pageState.urls.serverBaseUrl)
                pageStateDispatch(setAppConfigAction(appConfig));
                break;
            }
            case ActionType.GET_VIOLATION_ROWS: {
                await getViolationRowsDispatch(action as IGetViolationRowsAction, pageState, pageStateDispatch)
                break;
            }
            case ActionType.SAVE_VIOL_LOG: {
                await saveViolLogDispatch(action as ISaveViolLogAction, pageState, pageStateDispatch)
                break;
            }
            case ActionType.SUGGEST_ALERT_BUYERS: {
                await getAlertBuyersDispatch(action as IGetAlertBuyersAction, pageState, pageStateDispatch)
                // update violation data after ui refresh
                pageStateDispatch(setPendingActionsAction([...pageState.ui.pendingActions, getViolationRowsAction(false)]))
                break;
            }
            case ActionType.SUGGEST_EMERGENCY_BUYERS: {
                await getEmergencyBuyersDispatch(action as IGetEmergencyBuyersAction, pageState, pageStateDispatch)
                // update violation data after ui refresh
                pageStateDispatch(setPendingActionsAction([...pageState.ui.pendingActions, getViolationRowsAction(false)]))
                break;
            }
            case ActionType.SUGGEST_ALERT_SELLERS: {
                await getAlertSellersDispatch(action as IGetAlertSellersAction, pageState, pageStateDispatch)
                // update violation data after ui refresh
                pageStateDispatch(setPendingActionsAction([...pageState.ui.pendingActions, getViolationRowsAction(true)]))
                break;
            }
            case ActionType.SUGGEST_ALERT_OVER_INJ_SELLERS: {
                await getAlertOverInjSellersDispatch(action as IGetAlertOverInjSellersAction, pageState, pageStateDispatch)
                // update violation data after ui refresh
                pageStateDispatch(setPendingActionsAction([...pageState.ui.pendingActions, getViolationRowsAction(true)]))
                break;
            }
            case ActionType.SUGGEST_ALERT_UNDER_INJ_SELLERS: {
                await getAlertUnderInjSellersDispatch(action as IGetAlertUnderInjSellersAction, pageState, pageStateDispatch)
                // update violation data after ui refresh
                pageStateDispatch(setPendingActionsAction([...pageState.ui.pendingActions, getViolationRowsAction(true)]))
                break;
            }
            case ActionType.SUGGEST_EMERGENCY_SELLERS: {
                await getEmergencySellersDispatch(action as IGetEmergencySellersAction, pageState, pageStateDispatch)
                // update violation data after ui refresh
                pageStateDispatch(setPendingActionsAction([...pageState.ui.pendingActions, getViolationRowsAction(true)]))
                break;
            }
            default:
                pageStateDispatch(action);
        }
    }, [pageState.urls.serverBaseUrl, pageState.ui.freqPnt, pageState.ui.selectedCons, pageState.ui.selectedGens, pageState.ui.pendingActions]); // The empty array causes this callback to only be created once per component instance

    return [pageState, asyncDispatch];
}