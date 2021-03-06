import { IRtDataApiResp } from "../typeDefs/rtDataApiResp";

export const fetchPntData = async (baseAddr: string, pnt: string): Promise<number> => {
    try {
        if (pnt.trim() == "") {
            return NaN
        }
        const resp = await fetch(`${baseAddr}/rtDataApi/getpntData?id=${pnt}`, {
            method: 'get'
        })
        const val = (await resp.json() as IRtDataApiResp).val
        return val
    } catch (e) {
        console.error(e)
        return NaN
    }
};