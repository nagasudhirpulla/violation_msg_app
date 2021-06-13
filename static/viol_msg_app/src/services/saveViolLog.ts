import { ISaveLogApiResp } from "../typeDefs/saveLogApiResp";
import { IViolLog } from "../typeDefs/violLog";

export const saveViolLog = async (baseAddr: string, violLog: IViolLog): Promise<boolean> => {
    try {
        const resp = await fetch(`${baseAddr}/violLogsApi/saveLog`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(violLog)
        })
        const isSuccess = (await resp.json() as ISaveLogApiResp).success
        return isSuccess
    } catch (e) {
        console.error(e)
        return false
    }
};