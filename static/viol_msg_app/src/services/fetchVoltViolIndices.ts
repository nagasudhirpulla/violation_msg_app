import { ISuggestedVoltViolApiResp } from "../typeDefs/suggestedVoltViolApiResp";

export const fetchVoltViolIndices = async (baseAddr: string, state: string): Promise<ISuggestedVoltViolApiResp> => {
    try {
        const resp = await fetch(`${baseAddr}/rtDataApi/getVoltViolData?id=${state}`, {
            method: 'get'
        })
        const data = (await resp.json() as ISuggestedVoltViolApiResp)
        return data
        
    } catch (e) {
        console.error(e)
        return { voltViol: [], genStnMvar: [] } as ISuggestedVoltViolApiResp
    }
};