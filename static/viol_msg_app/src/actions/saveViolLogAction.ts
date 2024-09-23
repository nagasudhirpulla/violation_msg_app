import { saveViolLog } from "../services/saveViolLog";
import { IAction } from "../typeDefs/action";
import { IViolLog } from "../typeDefs/violLog";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";
import { toast } from 'react-toastify';

export interface ISaveViolLogPayload {
    violLog: IViolLog
}

export interface ISaveViolLogAction extends IAction {
    type: ActionType.SAVE_VIOL_LOG,
    payload: ISaveViolLogPayload
}

export function saveViolLogAction(violLog: IViolLog): ISaveViolLogAction {
    return {
        type: ActionType.SAVE_VIOL_LOG,
        payload: { violLog }
    };
}

export const saveViolLogDispatch = async (action: ISaveViolLogAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const violLog = action.payload.violLog
    const [isSuccess, msg] = await saveViolLog(pageState.urls.serverBaseUrl, violLog)
    if (!isSuccess) {
        toast.error(msg, {
            isLoading: false,
            autoClose: 10000
        });
        console.log("Unable to save violation log...")
    }
    else{
        toast.success(msg, {
            isLoading: false,
            autoClose: 10000
        });
        console.log(msg)
    }
}