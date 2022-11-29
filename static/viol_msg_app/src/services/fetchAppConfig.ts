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
                email: gen[1],
                schPnt: gen[2],
                drawalPnt: gen[3],
                acePnt: gen[4]
            })
        });
        respJSON.cons.forEach(c => {
            appConf.constituents.push({
                name: c[0],
                email: c[1],
                schPnt: c[2],
                drawalPnt: c[3],
                acePnt: c[4],
                atcPnt: c[5],
                ttcPnt: c[6]
            })
        });
        return appConf;
    } catch (e) {
        console.error(e);
        return { generators: [], constituents: [], freqPnt: "" };
        //return { success: false, message: `Could not retrieve employees data due to error ${JSON.stringify(e)}` };
    }
};