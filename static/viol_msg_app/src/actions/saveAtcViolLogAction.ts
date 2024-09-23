import { saveViolLog } from "../services/saveViolLog";
import { IAction } from "../typeDefs/action";
import { IAtcViolLog } from "../typeDefs/atcViolLog";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { ActionType } from "./actionType";
import { toast } from 'react-toastify';

export interface ISaveAtcViolLogPayload {
    atcViolLog: IAtcViolLog
}

export interface ISaveAtcViolLogAction extends IAction {
    type: ActionType.SAVE_VIOL_LOG,
    payload: ISaveAtcViolLogPayload
}

export function saveAtcViolLogAction(atcViolLog: IAtcViolLog): ISaveAtcViolLogAction {
    return {
        type: ActionType.SAVE_VIOL_LOG,
        payload: { atcViolLog }
    };
}

export const saveAtcViolLogDispatch = async (action: ISaveAtcViolLogAction, pageState: IAtcViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const atcViolLog = action.payload.atcViolLog
    const [isSuccess, msg] = await saveViolLog(pageState.urls.serverBaseUrl, atcViolLog)
    if (!isSuccess) {
        toast.error("Some error while sending ATC mail", {
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