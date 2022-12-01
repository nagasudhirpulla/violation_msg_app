import { ISuggestedBuyersApiResp } from "../typeDefs/suggestedBuyersApiResp";

export const fetchAlertBuyerIndices = async (baseAddr: string): Promise<number[]> => {
    try {
        const resp = await fetch(`${baseAddr}/rtDataApi/getAlertBuyers`, {
            method: 'get'
        })
        const indices = (await resp.json() as ISuggestedBuyersApiResp).indices
        return indices
    } catch (e) {
        console.error(e)
        return []
    }
};