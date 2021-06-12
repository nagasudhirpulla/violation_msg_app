import { IAppConfig } from "../typeDefs/appConfig";
import { IUtilsInfoResp } from "../typeDefs/utilsInfoResp";

export const fetchAppConfig = async (baseAddr: string): Promise<IAppConfig> => {
    try {
        const resp = await fetch(`${baseAddr}/utilPntsApi/getUtilsInfo`, {
            method: 'get'
        });
        const respJSON = await resp.json() as IUtilsInfoResp;
        const appConf: IAppConfig = {
            generators: [],
            constituents: [],
            freqPnt: respJSON.freqPnt
        }
        //console.log(respJSON);
        respJSON.gens.forEach(gen => {
            appConf.generators.push({
                name: gen[0],
                schPnt: gen[1],
                drawalPnt: gen[2],
                acePnt: gen[3]
            })
        });
        respJSON.cons.forEach(c => {
            appConf.constituents.push({
                name: c[0],
                schPnt: c[1],
                drawalPnt: c[2],
                acePnt: c[3]
            })
        });
        return appConf;
    } catch (e) {
        console.error(e);
        return { generators: [], constituents: [], freqPnt: "" };
        //return { success: false, message: `Could not retrieve employees data due to error ${JSON.stringify(e)}` };
    }
};