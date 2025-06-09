import { IAtcViolLog } from "../typeDefs/atcViolLog";
import { IVoltViolLog } from "../typeDefs/voltViolLog";
import { ISaveLogApiResp } from "../typeDefs/saveLogApiResp";
import { IViolLog } from "../typeDefs/violLog";

export const saveViolLog = async (baseAddr: string, violLog: IViolLog | IAtcViolLog | IVoltViolLog): Promise<[boolean, string]> => {
    try {
        const resp = await fetch(`${baseAddr}/violLogsApi/saveLog`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(violLog)
        })
        const respJson = await resp.json() as ISaveLogApiResp
        // console.log(respJson)
        return [respJson.success, respJson.msg]
    } catch (e) {
        console.error(e)
        return [false, ""]
    }
};