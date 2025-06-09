import { ISuggestedVoltViolApiResp } from "../typeDefs/suggestedVoltViolApiResp";

export const fetchVoltViolIndices = async (baseAddr: string, state: string, isHighVoltMsg: number): Promise<ISuggestedVoltViolApiResp> => {
    try {
        const params = new URLSearchParams({
            id: state,
            isHighVoltMsg: String(isHighVoltMsg ? 1 : 0)
        });
        // const resp = await fetch(`${baseAddr}/rtDataApi/getVoltViolData?id=${state}&isHighVoltMsg=${isHighVoltMsg}`, {
        //     method: 'get'
        // })
        const resp = await fetch(`${baseAddr}/rtDataApi/getVoltViolData?${params.toString()}`, {
            method: 'get'
        })
        const data = (await resp.json() as ISuggestedVoltViolApiResp)
        return data
        
    } catch (e) {
        console.error(e)
        return { voltViol: [], genStnMvar: [] } as ISuggestedVoltViolApiResp
    }
};