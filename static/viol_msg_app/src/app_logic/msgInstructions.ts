export const getMsgInstructions = (isGenSelected: boolean): string => {
    if (isGenSelected) {
        return [].join("\n")
    }
    return [
        "Utilities are requested to reduce their overdrawl",
        "Incerase their schedule from ISGS stations/IPP stations",
        "Increase their internal generation",
        "Further Load shedding may be taken to reduce overdrawl",
        "If Over drawl continues suo motto revision shall be implemented"
    ].join("\n")
};