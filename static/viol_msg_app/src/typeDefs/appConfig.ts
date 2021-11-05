import { IStateUtilPnt } from "./stateUtilPnt";
import { IUtilPnt } from "./utilPnt";

export interface IAppConfig {
    freqPnt: string,
    generators: IUtilPnt[],
    constituents: IStateUtilPnt[]
}