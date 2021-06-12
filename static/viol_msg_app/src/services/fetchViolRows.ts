import { IUtilPnt } from "../typeDefs/utilPnt";
import { IViolInfoRow } from "../typeDefs/violInfoRow";
import { fetchPntData } from "./fetchPntData";

export const fetchViolRows = async (baseAddr: string, utils: IUtilPnt[]): Promise<IViolInfoRow[]> => {
    try {
        const violInfoRows: IViolInfoRow[] = []
        for (let uIter = 0; uIter < utils.length; uIter++) {
            const utl = utils[uIter]
            const schPnt = utl.schPnt
            const schVal = await fetchPntData(baseAddr, schPnt)

            const drwlPnt = utl.drawalPnt
            const drwlVal = await fetchPntData(baseAddr, drwlPnt)

            const acePnt = utl.acePnt
            const aceVal = await fetchPntData(baseAddr, acePnt)

            violInfoRows.push({
                name: utl.name,
                schedule: schVal,
                drawal: drwlVal,
                ace: aceVal
            })
        }
        return violInfoRows
    } catch (e) {
        console.error(e)
        return []
        //return { success: false, message: `Could not retrieve employees data due to error ${JSON.stringify(e)}` };
    }
};