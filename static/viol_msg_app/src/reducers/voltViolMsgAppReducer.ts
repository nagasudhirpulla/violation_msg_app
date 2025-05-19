import { useReducer, useEffect, useCallback } from "react";
import { getAppConfigAction } from "../actions/getAppConfigAction";
import { fetchAppConfig } from "../services/fetchAppConfig";
import { ISetAppConfigAction, setAppConfigAction, setAtcPageAppConfigReducer, setVoltViolPageAppConfigReducer } from "../actions/setAppConfigAction";
import { ActionType } from "../actions/actionType";
import { IAction } from "../typeDefs/action";
import { ISetMsgTimeAction, setVoltViolPageMsgTimeReducer } from "../actions/setMsgTimeAction";
import { ISetMsgIdAction, setVoltViolPageMsgIdReducer } from "../actions/setMsgIdAction";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { ISetVoltViolInfoRowsAction, setVoltViolInfoRowsReducer } from "../actions/setVoltViolRowsAction";
import { ISetGenStnMvarInfoRowsAction, setGenStnMvarInfoRowsReducer } from "../actions/setGenStnMvarInfoRowsAction";
import { ISetShInchAction, setVoltViolPageShInchReducer } from "../actions/setShInchAction";
import { ISetRecipientAddrAction, setVoltViolPageRecipientAddrReducer } from "../actions/setRecipientAddrAction";
import { ISetRecipientEmailsAction, setVoltViolPageRecipientEmailsReducer } from "../actions/setRecipientEmailsAction";
import { getVoltViolInfoRowsDispatch, IGetVoltViolInfoRowsAction } from "../actions/getVoltViolInfoRowsAction";
import { getGenStnMvarInfoRowsAction, IGetGenStnMvarInfoRowsAction } from "../actions/getGenStnMvarInfoRowsAction";
import { ISaveVoltViolLogAction, saveVoltViolLogDispatch } from "../actions/saveVoltViolLogAction";

export const useVoltViolMsgAppReducer = (initState: IVoltViolMsgAppState): [IVoltViolMsgAppState, React.Dispatch<IAction>] => {
    // create the reducer function
    const reducer = (state: IVoltViolMsgAppState, action: IAction): IVoltViolMsgAppState => {
        switch (action.type) {
            case ActionType.SET_APP_CONFIG:
                return setVoltViolPageAppConfigReducer(state, action as ISetAppConfigAction)
            case ActionType.SET_VOLT_VIOL_INFO_ROWS:
                return setVoltViolInfoRowsReducer(state, action as ISetVoltViolInfoRowsAction)
            case ActionType.SET_GEN_STN_MVAR_INFO_ROWS:
                return setGenStnMvarInfoRowsReducer(state, action as ISetGenStnMvarInfoRowsAction)
            case ActionType.SET_MSG_TIME:
                return setVoltViolPageMsgTimeReducer(state, action as ISetMsgTimeAction)
            case ActionType.SET_MSG_ID:
                return setVoltViolPageMsgIdReducer(state, action as ISetMsgIdAction)
            case ActionType.SET_RECIPIENT_ADDR:
                return setVoltViolPageRecipientAddrReducer(state, action as ISetRecipientAddrAction)
            case ActionType.SET_RECIPIENT_MAILS:
                return setVoltViolPageRecipientEmailsReducer(state, action as ISetRecipientEmailsAction)
            case ActionType.SET_SH_INCH:
                return setVoltViolPageShInchReducer(state, action as ISetShInchAction)
            default:
                console.log("unwanted action detected");
                console.log(JSON.stringify(action));
                //throw new Error();
                return state;
            // return state also works
        }
    }

    // create the reducer hook
    let [pageState, pageStateDispatch]: [IVoltViolMsgAppState, React.Dispatch<IAction>] = useReducer(reducer, initState)

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
            case ActionType.GET_VOLT_VIOL_INFO_ROWS: {
                await getVoltViolInfoRowsDispatch(action as IGetVoltViolInfoRowsAction, pageState, pageStateDispatch)
                break;
            }
            case ActionType.SAVE_VIOL_LOG: {
                await saveVoltViolLogDispatch(action as ISaveVoltViolLogAction, pageState, pageStateDispatch)
                break;
            }
            default:
                pageStateDispatch(action);
        }
    }, [pageState.urls.serverBaseUrl]); // The empty array causes this callback to only be created once per component instance

    return [pageState, asyncDispatch];
}