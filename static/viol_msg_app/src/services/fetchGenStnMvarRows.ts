import { IGenStnMvarInfoRow } from "../typeDefs/genStnMvarInfoRow";
import { IGenStnUtilPnt } from "../typeDefs/genStnUtilPnt";
import { fetchPntData } from "./fetchPntData";

export const fetchGenStnMvarRows = async (baseAddr: string, genStnUtils: IGenStnUtilPnt[]): Promise<IGenStnMvarInfoRow[]> => {
    try {
        const genStnMvarInfoRows: IGenStnMvarInfoRow[] = []
        for (let uIter = 0; uIter < genStnUtils.length; uIter++) {
            const utl = genStnUtils[uIter]
            const mvarPnt = utl.mvar
            const mvarVal = await fetchPntData(baseAddr, mvarPnt)

            genStnMvarInfoRows.push({
                name: utl.name,
                mvar: mvarVal
            })
        }
        return genStnMvarInfoRows
    } catch (e) {
        console.error(e)
        return []
        //return { success: false, message: `Could not retrieve mvar data data due to error ${JSON.stringify(e)}` };
    }
};