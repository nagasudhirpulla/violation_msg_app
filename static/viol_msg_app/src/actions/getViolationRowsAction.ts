import { getMsgInstructions } from "../app_logic/msgInstructions";
import { fetchPntData } from "../services/fetchPntData";
import { fetchViolRows } from "../services/fetchViolRows";
import { IAction } from "../typeDefs/action";
import { IUtilPnt } from "../typeDefs/utilPnt";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";
import { setDistributionEmailsAction } from "./setDistributionEmailsAction";
import { setFreqAction } from "./setFreqAction";
import { setIsGenSelAction } from "./setIsGenSelAction";
import { setMsgInstrucAction } from "./setMsgInstrucAction";
import { setViolRowsAction } from "./setViolRowsAction";
import { setViolTypeAction } from "./setViolTypeAction";

export interface IGetViolationRowsPayload {
    utils: IUtilPnt[],
    isGen: boolean
}

export interface IGetViolationRowsAction extends IAction {
    type: ActionType.GET_VIOLATION_ROWS,
    payload: IGetViolationRowsPayload
}

export function getViolationRowsAction(utils: IUtilPnt[], isGen: boolean): IGetViolationRowsAction {
    return {
        type: ActionType.GET_VIOLATION_ROWS,
        payload: { utils, isGen }
    };
}

export const getViolationRowsDispatch = async (action: IGetViolationRowsAction, pageState: IViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    const isGen = action.payload.isGen
    pageStateDispatch(setIsGenSelAction(isGen))

    let utils = action.payload.utils
    const violRows = await fetchViolRows(pageState.urls.serverBaseUrl, utils)
    pageStateDispatch(setViolRowsAction(violRows))

    const freq = await fetchPntData(pageState.urls.serverBaseUrl, pageState.ui.freqPnt)
    pageStateDispatch(setFreqAction(freq))
    if (violRows.length > 0) {
        const isViolPossitive = (violRows[0].drawal - violRows[0].schedule) > 0
        // init message instructions
        pageStateDispatch(setMsgInstrucAction(getMsgInstructions(isGen, isViolPossitive)))

        // init message viol type
        let violType = ""
        if (isGen && !isViolPossitive) {
            violType = "Under Injection"
        } else if (isGen && isViolPossitive) {
            violType = "Over Injection"
        } else if (!isGen && !isViolPossitive) {
            violType = "Under Drawal"
        } else if (!isGen && isViolPossitive) {
            violType = "Over Drawal"
        }
        pageStateDispatch(setViolTypeAction(violType))

        // set the distribution emails list
        const emailListStr = action.payload.utils.map(u => u.email).join(";")
        pageStateDispatch(setDistributionEmailsAction(`Distribution List: ${emailListStr}`))
    }
}