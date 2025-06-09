import { saveViolLog } from "../services/saveViolLog";
import { IAction } from "../typeDefs/action";
import { IVoltViolLog } from "../typeDefs/voltViolLog";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { ActionType } from "./actionType";
import { toast } from 'react-toastify';

export interface ISaveVoltViolLogPayload {
    voltViolLog: IVoltViolLog
}

export interface ISaveVoltViolLogAction extends IAction {
    type: ActionType.SAVE_VIOL_LOG,
    payload: ISaveVoltViolLogPayload
}

export function saveVoltViolLogAction(voltViolLog: IVoltViolLog): ISaveVoltViolLogAction {
    return {
        type: ActionType.SAVE_VIOL_LOG,
        payload: { voltViolLog }
    };
}

export const saveVoltViolLogDispatch = async (action: ISaveVoltViolLogAction, pageState: IVoltViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const voltViolLog = action.payload.voltViolLog
    const [isSuccess, msg] = await saveViolLog(pageState.urls.serverBaseUrl, voltViolLog)
    if (!isSuccess) {
        toast.error(msg, {
            isLoading: false,
            autoClose: 10000,
            style: { fontWeight: 'bold' }
        });
        console.log("Unable to save violation log...")
    }
    else{
        toast.success(msg, {
            isLoading: false,
            autoClose: 10000,
            style: { fontWeight: 'bold' }
        });
        console.log(msg)
    }
}