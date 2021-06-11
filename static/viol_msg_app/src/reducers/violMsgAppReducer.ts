import { useReducer, useEffect, useCallback } from "react";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { getAppConfigAction } from "../actions/getAppConfigAction";
import { fetchAppConfig } from "../services/getAppConfig";
import { ISetAppConfigAction, setAppConfigAction, setAppConfigReducer } from "../actions/setAppConfigAction";
import { ActionType } from "../actions/actionType";
import { IAction } from "../typeDefs/action";

export const useViolMsgAppReducer = (initState: IViolMsgAppState): [IViolMsgAppState, React.Dispatch<IAction>] => {
    // create the reducer function
    const reducer = (state: IViolMsgAppState, action: IAction): IViolMsgAppState => {
        switch (action.type) {
            case ActionType.SET_APP_CONFIG:
                return setAppConfigReducer(state, action as ISetAppConfigAction)
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
            default:
                pageStateDispatch(action);
        }
    }, [pageState.urls.serverBaseUrl]); // The empty array causes this callback to only be created once per component instance

    return [pageState, asyncDispatch];
}