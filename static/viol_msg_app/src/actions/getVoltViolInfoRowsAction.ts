import { fetchVoltViolRows } from "../services/fetchVoltViolRows";
import { IAction } from "../typeDefs/action";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { IStateUtilPnt } from "../typeDefs/stateUtilPnt";
import { ActionType } from "./actionType";
import { setVoltViolInfoRowsAction } from "./setVoltViolRowsAction";
import { setGenStnMvarInfoRowsAction } from "./setGenStnMvarInfoRowsAction";
import { setRecipientAddrAction } from "./setRecipientAddrAction";
import { setRecipientEmailsAction } from "./setRecipientEmailsAction";
import { fetchVoltViolIndices } from "../services/fetchVoltViolIndices";

export interface IGetVoltViolInfoRowsPayload {
    utils: IStateUtilPnt[],
    isHighVoltMsg: number
}

export interface IGetVoltViolInfoRowsAction extends IAction {
    type: ActionType.GET_VOLT_VIOL_INFO_ROWS,
    payload: IGetVoltViolInfoRowsPayload
}

export function getVoltViolInfoRowsAction(utils: IStateUtilPnt[], isHighVoltMsg: number): IGetVoltViolInfoRowsAction {
    return {
        type: ActionType.GET_VOLT_VIOL_INFO_ROWS,
        payload: { utils, isHighVoltMsg }
    };
}

export const getVoltViolInfoRowsDispatch = async (action: IGetVoltViolInfoRowsAction, pageState: IVoltViolMsgAppState, pageStateDispatch: React.Dispatch<IAction>): Promise<void> => {
    let utils = action.payload.utils
    const isHighVoltMsg = action.payload.isHighVoltMsg
    const receiversStr = "To: " + utils.map(x => x.name).join(", ")
    const stateList = utils.map(x => x.name).join(",") // Last value is for HV
    console.log("stateList: ", stateList)
    pageStateDispatch(setRecipientAddrAction(receiversStr))

    // set the distribution emails list
    let emailListStr = utils.filter(u => u.email.trim().length > 0).map(u => u.email).join(";")
    pageStateDispatch(setRecipientEmailsAction(emailListStr))

    // const {voltViol, genStnMvar} = await fetchVoltViolIndices(pageState.urls.serverBaseUrl, utils[0].name)
    const {voltViol, genStnMvar} = await fetchVoltViolIndices(pageState.urls.serverBaseUrl, stateList, isHighVoltMsg)
    console.log("voltViol: ", voltViol)
    console.log("genStnMvar: ", genStnMvar)
    const voltViolInfoRows = voltViol.map(([name, volt]) => ({ name, volt }));
    const genStnMvarInfoRows = genStnMvar.map(([name, mvar]) => ({ name, mvar }));
    // set the volt viol info rows
    pageStateDispatch(setVoltViolInfoRowsAction(voltViolInfoRows))
    // set the gen stn mvar info rows
    pageStateDispatch(setGenStnMvarInfoRowsAction(genStnMvarInfoRows))
}