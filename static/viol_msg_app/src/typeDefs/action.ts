import { ActionType } from "../actions/actionType";

export interface IAction {
    type: ActionType;
    payload?: any;
}