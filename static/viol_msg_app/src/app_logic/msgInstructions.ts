export const getMsgInstructions = (isGen: boolean, isViolPossitive: boolean): string => {
    if (!isGen && isViolPossitive) {
        return [
            "Utilities are requested to reduce their overdrawl",
            "Incerase their schedule from ISGS stations/IPP stations",
            "Increase their internal generation",
            "Further Load shedding may be taken to reduce overdrawl",
            "If Over drawl continues suo motto revision shall be implemented and emergency measures shall be taken"
        ].join("\n")
    }
    else if (!isGen && !isViolPossitive) {
        return [
            "Utilities are requested to reduce their underdrawl",
            "Reduce their schedule from ISGS stations/IPP stations",
            "Reduce their internal generation",
            "If Underdrawl continues suo motto revision shall be implemented and emergency measures shall be taken"
        ].join("\n")
    }
    return ""
};