import { IStateUtilPnt } from "./stateUtilPnt";
import { ISubStnUtilPnt } from "./subStnUtilPnt";
import { IGenStnUtilPnt } from "./genStnUtilPnt";
import { IUtilPnt } from "./utilPnt";

export interface IAppConfig {
    freqPnt: string,
    generators: IUtilPnt[],
    constituents: IStateUtilPnt[],
    subStn: ISubStnUtilPnt[],
    genStnMvar: IGenStnUtilPnt[]

}