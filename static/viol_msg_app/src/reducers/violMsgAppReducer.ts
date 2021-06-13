import { useReducer, useEffect, useCallback } from "react";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { getAppConfigAction } from "../actions/getAppConfigAction";
import { fetchAppConfig } from "../services/fetchAppConfig";
import { ISetAppConfigAction, setAppConfigAction, setAppConfigReducer } from "../actions/setAppConfigAction";
import { ActionType } from "../actions/actionType";
import { IAction } from "../typeDefs/action";
import { ISetViolRowsAction, setViolRowsReducer } from "../actions/setViolRowsAction";
import { getViolationRowsDispatch, IGetViolationRowsAction } from "../actions/getViolationRowsAction";
import { ISetMsgTimeAction, setMsgTimeReducer } from "../actions/setMsgTimeAction";
import { ISetFreqAction, setFreqReducer } from "../actions/setFreqAction";
import { ISetMsgIdAction, setMsgIdReducer } from "../actions/setMsgIdAction";
import { ISetMsgInstrucAction, setMsgInstrucReducer } from "../actions/setMsgInstrucAction";
import { IInitMsgInstrucAction, initMsgInstrucReducer } from "../actions/initMsgInstrucAction";
import { ISetIsGenSelAction, setIsGenSelReducer } from "../actions/setIsGenSelAction";
import { ISetViolTypeAction, setViolTypeReducer } from "../actions/setViolTypeAction";
import { ISaveViolLogAction, saveViolLogDispatch } from "../actions/saveViolLogAction";

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
            default:
                pageStateDispatch(action);
        }
    }, [pageState.urls.serverBaseUrl]); // The empty array causes this callback to only be created once per component instance

    return [pageState, asyncDispatch];
}