import { IVoltViolInfoRow } from "../typeDefs/voltViolInfoRow";
import { ISubStnUtilPnt } from "../typeDefs/subStnUtilPnt";
import { fetchPntData } from "./fetchPntData";

export const fetchVoltViolRows = async (baseAddr: string, subStnUtils: ISubStnUtilPnt[]): Promise<IVoltViolInfoRow[]> => {
    try {
        const voltViolInfoRows: IVoltViolInfoRow[] = []
        for (let uIter = 0; uIter < subStnUtils.length; uIter++) {
            const utl = subStnUtils[uIter]
            const voltPnt = utl.voltPnt
            const voltVal = await fetchPntData(baseAddr, voltPnt)

            voltViolInfoRows.push({
                name: utl.name,
                volt: voltVal
            })
        }
        return voltViolInfoRows
    } catch (e) {
        console.error(e)
        return []
        //return { success: false, message: `Could not retrieve voltage data data due to error ${JSON.stringify(e)}` };
    }
};