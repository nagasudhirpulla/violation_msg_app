import { ISuggestedSellersApiResp } from "../typeDefs/suggestedSellersApiResp";

export const fetchEmergencySellerIndices = async (baseAddr: string): Promise<number[]> => {
    try {
        const resp = await fetch(`${baseAddr}/rtDataApi/getEmergencySellers`, {
            method: 'get'
        })
        const indices = (await resp.json() as ISuggestedSellersApiResp).indices
        return indices
    } catch (e) {
        console.error(e)
        return []
    }
};