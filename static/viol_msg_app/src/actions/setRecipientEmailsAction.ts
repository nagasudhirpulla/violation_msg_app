import { IAction } from "../typeDefs/action";
import { IAtcViolMsgAppState } from "../typeDefs/atcViolMsgAppState";
import { IVoltViolMsgAppState } from "../typeDefs/voltViolMsgAppState";
import { ActionType } from "./actionType";

export interface ISetRecipientEmailsPayload {
    emails: string
}

export interface ISetRecipientEmailsAction extends IAction {
    type: ActionType.SET_RECIPIENT_MAILS,
    payload: ISetRecipientEmailsPayload
}

export function setRecipientEmailsAction(emails: string): ISetRecipientEmailsAction {
    return {
        type: ActionType.SET_RECIPIENT_MAILS,
        payload: { emails : emails}
    };
}

export const setAtcPageRecipientEmailsReducer = (state: IAtcViolMsgAppState, action: ISetRecipientEmailsAction): IAtcViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            recipientMails: action.payload.emails
        }
    };
}

export const setVoltViolPageRecipientEmailsReducer = (state: IVoltViolMsgAppState, action: ISetRecipientEmailsAction): IVoltViolMsgAppState => {
    return {
        ...state,
        ui: {
            ...state.ui,
            recipientMails: action.payload.emails
        }
    };
}