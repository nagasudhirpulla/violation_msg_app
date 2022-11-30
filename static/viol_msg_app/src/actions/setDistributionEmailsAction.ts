import { IAction } from "../typeDefs/action";
import { IViolMsgAppState } from "../typeDefs/violMsgAppState";
import { ActionType } from "./actionType";

export interface ISetDistributionEmailsPayload {
    emails: string
}

export interface ISetDistributionEmailsAction extends IAction {
    type: ActionType.SET_DISTRIBUTION_MAILS,
    payload: ISetDistributionEmailsPayload
}

export function setDistributionEmailsAction(emails: string): ISetDistributionEmailsAction {
    return {
        type: ActionType.SET_DISTRIBUTION_MAILS,
        payload: { emails: emails }
    };
}

export const setDistributionEmailsReducer = (state: IViolMsgAppState, action: ISetDistributionEmailsAction): IViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            distributionMails: action.payload.emails
        }
    };
}