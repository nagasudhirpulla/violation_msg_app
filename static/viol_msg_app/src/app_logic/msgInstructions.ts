export const getMsgInstructions = (isGen: boolean, isViolPossitive: boolean): string => {
    if (!isGen && isViolPossitive) {
        return [
            "It is here by requested to take immediate action to strictly adhere to schedule drawl for reliable/secure System Operation.",
            "SLDC shall manage the internal generation to reduce deviation.",
            "SLDC shall manage the schedule from ISGS stations/IPP stations to reduce deviation.",
            "SLDC(s) shall ensure correct operation of UFR/ Automatic Demand Management Scheme(ADMS) as per approved logic in their respective control area. The details of UFR/ ADMS operation if any may please be informed"
        ].join("\n")
    }
    else if (!isGen && !isViolPossitive) {
        return [
            "It is here by requested to take immediate action to strictly adhere to schedule drawl for reliable/secure System Operation.",
            "SLDC shall manage the internal generation to reduce deviation.",
            "SLDC shall manage the schedule from ISGS stations/IPP stations to reduce deviation.",
            "SLDC(s) shall ensure correct operation of UFR/ Automatic Demand Management Scheme(ADMS) as per approved logic in their respective control area. The details of UFR/ ADMS operation if any may please be informed"
        ].join("\n")
    }
    else if (isGen && !isViolPossitive) {
        return [
            "It is here by requested to take immediate action to strictly adhere to schedule generation for reliable/secure System Operation."
        ].join("\n")
    }
    else if (isGen && isViolPossitive) {
        return [
            "It is here by requested to take immediate action to strictly adhere to schedule generation for reliable/secure System Operation."
        ].join("\n")
    }
    return ""
};