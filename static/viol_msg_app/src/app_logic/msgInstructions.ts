export const getMsgInstructions = (isGen: boolean, isViolPossitive: boolean): string => {
    if (!isGen && isViolPossitive) {
        return [
            "Utilities are requested to reduce their deviation",
            "Manage their schedule from ISGS stations/IPP stations to reduce deviation",
            "Manage their internal generation to reduce deviation",
            "State utilities to be advised to manage captive generation in the state",
            "Further Demand-side measures may be taken to reduce deviation",
            "If deviation continues suo motto revision shall be implemented and emergency measures shall be taken",
            "उपयोगिताओं से अनुरोध है कि वे अपने डेविएशन को नियंत्रित करें।",
            "आईएसजीएस स्टेशनों/आईपीपी स्टेशनों में अपने शिड्यूल को मैनेज करें।",
            "अपने आतंरिक जनरेशन को मैनेज करें",
            "डेविएशन को कम करने के लिए मांग की ओर से उपाय किए जा सकते हैं।",
            "उपभोक्ताओं को राज्य में कैप्टिव जनरेशन का उपयोग करने की सलाह दी जाए",
            "यदि डेविएशन जारी रहता है तो सुओ-मोटो लागू किया जाएगा एवं आपातकालीन उपाय किए जाएंगे।"
        ].join("\n")
    }
    else if (!isGen && !isViolPossitive) {
        return [
            "Utilities are requested to reduce their deviation",
            "Manage their schedule from ISGS stations/IPP stations to reduce deviation",
            "Manage their internal generation to reduce deviation",
            "State utilities to be advised to manage captive generation in the state",
            "Further Demand-side measures may be taken to reduce deviation",
            "If deviation continues suo motto revision shall be implemented and emergency measures shall be taken",
            "उपयोगिताओं से अनुरोध है कि वे अपने डेविएशन को नियंत्रित करें।",
            "आईएसजीएस स्टेशनों/आईपीपी स्टेशनों में अपने शिड्यूल को मैनेज करें।",
            "अपने आतंरिक जनरेशन को मैनेज करें",
            "डेविएशन को कम करने के लिए मांग की ओर से उपाय किए जा सकते हैं।",
            "उपभोक्ताओं को राज्य में कैप्टिव जनरेशन का उपयोग करने की सलाह दी जाए",
            "यदि डेविएशन जारी रहता है तो सुओ-मोटो लागू किया जाएगा एवं आपातकालीन उपाय किए जाएंगे।"
        ].join("\n")
    }
    else if (isGen && !isViolPossitive) {
        return [
            "Generator(s) are requested to reduce their deviation and generate as per schedule",
            "जनरेटरों से अनुरोध है कि वे अपने डेविएशन को कम करें और शेड्यूल के अनुसार उत्पादन करें।"
        ].join("\n")
    }
    else if (isGen && isViolPossitive) {
        return [
            "Generator(s) are requested to reduce their deviation and generate as per schedule",
            "जनरेटरों से अनुरोध है कि वे अपने डेविएशन को कम करें और शेड्यूल के अनुसार उत्पादन करें।"
        ].join("\n")
    }
    return ""
};