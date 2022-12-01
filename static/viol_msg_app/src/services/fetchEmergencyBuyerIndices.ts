import { ISuggestedBuyersApiResp } from "../typeDefs/suggestedBuyersApiResp";

export const fetchEmergencyBuyerIndices = async (baseAddr: string): Promise<number[]> => {
    try {
        const resp = await fetch(`${baseAddr}/rtDataApi/getEmergencyBuyers`, {
            method: 'get'
        })
        const indices = (await resp.json() as ISuggestedBuyersApiResp).indices
        return indices
    } catch (e) {
        console.error(e)
        return []
    }
};