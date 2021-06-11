import { IRtDataApiResp } from "../typeDefs/rtDataApiResp";
import { IUtilPnt } from "../typeDefs/utilPnt";
import { IViolInfoRow } from "../typeDefs/violInfoRow";

export const fetchViolRows = async (baseAddr: string, utils: IUtilPnt[]): Promise<IViolInfoRow[]> => {
    try {
        const violInfoRows: IViolInfoRow[] = []
        utils.forEach(async utl => {
            const schPnt = utl.schPnt
            const schResp = await fetch(`${baseAddr}/rtDataApi/getpntData?id=${schPnt}`, {
                method: 'get'
            });
            const schVal = (await schResp.json() as IRtDataApiResp).val

            const drwlPnt = utl.drawalPnt
            const drwlResp = await fetch(`${baseAddr}/rtDataApi/getpntData?id=${drwlPnt}`, {
                method: 'get'
            });
            const drwlVal = (await drwlResp.json() as IRtDataApiResp).val

            const acePnt = utl.acePnt
            const aceResp = await fetch(`${baseAddr}/rtDataApi/getpntData?id=${acePnt}`, {
                method: 'get'
            });
            const aceVal = (await aceResp.json() as IRtDataApiResp).val
            violInfoRows.push({
                name: utl.name,
                schedule: schVal,
                drawal: drwlVal,
                ace: aceVal
            })
        })

        return violInfoRows
    } catch (e) {
        console.error(e)
        return []
        //return { success: false, message: `Could not retrieve employees data due to error ${JSON.stringify(e)}` };
    }
};