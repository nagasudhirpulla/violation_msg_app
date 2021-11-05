import { IAtcInfoRow } from "../typeDefs/atcInfoRow";
import { IStateUtilPnt } from "../typeDefs/stateUtilPnt";
import { fetchPntData } from "./fetchPntData";

export const fetchAtcRows = async (baseAddr: string, utils: IStateUtilPnt[]): Promise<IAtcInfoRow[]> => {
    try {
        const atcInfoRows: IAtcInfoRow[] = []
        for (let uIter = 0; uIter < utils.length; uIter++) {
            const utl = utils[uIter]
            const atcPnt = utl.atcPnt
            const atcVal = await fetchPntData(baseAddr, atcPnt)

            const drwlPnt = utl.drawalPnt
            const drwlVal = await fetchPntData(baseAddr, drwlPnt)

            atcInfoRows.push({
                name: utl.name,
                drawal: drwlVal,
                atc: atcVal
            })
        }
        return atcInfoRows
    } catch (e) {
        console.error(e)
        return []
        //return { success: false, message: `Could not retrieve employees data due to error ${JSON.stringify(e)}` };
    }
};